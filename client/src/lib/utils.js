import { clsx } from "clsx";
import { format, formatDistanceToNow } from "date-fns";

export const cn = (...inputs) => clsx(inputs);

export const formatDate = (value, pattern = "dd MMM yyyy, hh:mm a") =>
  value ? format(new Date(value), pattern) : "N/A";

export const fromNow = (value) =>
  value ? formatDistanceToNow(new Date(value), { addSuffix: true }) : "N/A";

export const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
