import mongoose from "mongoose";
import User from "../models/User.js";
import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

export const getOrganizerDashboard = async (req, res) => {
  const organizerId = new mongoose.Types.ObjectId(req.user._id);

  const [summary, registrationsPerEvent, categoryPerformance] = await Promise.all([
    Event.aggregate([
      { $match: { organizer: organizerId } },
      {
        $lookup: {
          from: "registrations",
          localField: "_id",
          foreignField: "event",
          as: "registrations"
        }
      },
      {
        $group: {
          _id: null,
          totalEvents: { $sum: 1 },
          totalRegistrations: { $sum: { $size: "$registrations" } },
          pendingApprovals: {
            $sum: {
              $cond: [{ $eq: ["$approvalStatus", "pending"] }, 1, 0]
            }
          }
        }
      }
    ]),
    Event.aggregate([
      { $match: { organizer: organizerId } },
      {
        $lookup: {
          from: "registrations",
          localField: "_id",
          foreignField: "event",
          as: "registrations"
        }
      },
      {
        $project: {
          title: 1,
          registrations: { $size: "$registrations" },
          attendeesCount: 1
        }
      },
      { $sort: { registrations: -1 } }
    ]),
    Event.aggregate([
      { $match: { organizer: organizerId } },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: "$category" },
      {
        $group: {
          _id: "$category.name",
          totalEvents: { $sum: 1 },
          registrations: { $sum: "$registrationCount" }
        }
      },
      { $sort: { registrations: -1 } }
    ])
  ]);

  res.json({
    success: true,
    data: {
      cards: {
        totalEvents: summary[0]?.totalEvents || 0,
        totalRegistrations: summary[0]?.totalRegistrations || 0,
        pendingApprovals: summary[0]?.pendingApprovals || 0
      },
      registrationsPerEvent,
      categoryPerformance
    }
  });
};

export const getAdminDashboard = async (_req, res) => {
  const [counts, insights, monthlyRegistrations, userGrowth, organizerPerformance] = await Promise.all([
    Promise.all([
      User.countDocuments(),
      Event.countDocuments(),
      Registration.countDocuments()
    ]),
    Promise.all([
      Event.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category"
          }
        },
        { $unwind: "$category" },
        {
          $group: {
            _id: "$category.name",
            registrations: { $sum: "$registrationCount" }
          }
        },
        { $sort: { registrations: -1 } },
        { $limit: 1 }
      ]),
      Event.aggregate([
        {
          $project: {
            title: 1,
            attendeesCount: 1
          }
        },
        { $sort: { attendeesCount: -1 } },
        { $limit: 1 }
      ]),
      Registration.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        },
        {
          $count: "count"
        }
      ])
    ]),
    Registration.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          registrations: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]),
    Event.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "organizer",
          foreignField: "_id",
          as: "organizer"
        }
      },
      { $unwind: "$organizer" },
      {
        $group: {
          _id: "$organizer.name",
          totalEvents: { $sum: 1 },
          totalRegistrations: { $sum: "$registrationCount" },
          totalAttendance: { $sum: "$attendeesCount" }
        }
      },
      { $sort: { totalRegistrations: -1 } }
    ])
  ]);

  res.json({
    success: true,
    data: {
      cards: {
        totalUsers: counts[0],
        totalEvents: counts[1],
        totalRegistrations: counts[2]
      },
      eventInsights: {
        mostPopularEventCategory: insights[0]?.[0]?._id || "N/A",
        highestAttendanceEvent: insights[1]?.[0]?.title || "N/A",
        totalRegistrationsThisMonth: insights[2]?.[0]?.count || 0
      },
      userGrowth,
      monthlyRegistrations,
      organizerPerformance
    }
  });
};

export const getParticipantDashboard = async (req, res) => {
  const participantId = new mongoose.Types.ObjectId(req.user._id);

  const [myRegistrations, attended, favorites, leaderboard] = await Promise.all([
    Registration.countDocuments({ participant: participantId, status: { $in: ["registered", "attended", "waitlisted"] } }),
    Registration.countDocuments({ participant: participantId, status: "attended" }),
    User.findById(req.user._id).populate("favorites"),
    Registration.aggregate([
      { $match: { status: "attended" } },
      {
        $group: {
          _id: "$participant",
          points: { $sum: 10 },
          attendedEvents: { $sum: 1 }
        }
      },
      { $sort: { points: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          name: "$user.name",
          points: 1,
          attendedEvents: 1
        }
      }
    ])
  ]);

  res.json({
    success: true,
    data: {
      cards: {
        myRegistrations,
        attendedEvents: attended,
        favorites: favorites?.favorites?.length || 0
      },
      leaderboard
    }
  });
};
