export const parsePagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

export const buildEventFilters = (query) => {
  const filters = {};

  if (query.category) filters.category = query.category;
  if (query.venue) filters.venue = { $regex: query.venue, $options: "i" };
  if (query.organizer) filters.organizerName = { $regex: query.organizer, $options: "i" };
  if (query.mode) filters.mode = query.mode;
  if (query.status) filters.status = query.status;
  if (query.approvalStatus) filters.approvalStatus = query.approvalStatus;
  if (query.date) {
    const start = new Date(query.date);
    const end = new Date(query.date);
    end.setHours(23, 59, 59, 999);
    filters.startDate = { $gte: start, $lte: end };
  }
  if (query.search) {
    filters.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } },
      { tags: { $in: [new RegExp(query.search, "i")] } }
    ];
  }

  return filters;
};
