import {
  formatDistanceToNow,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  differenceInWeeks
} from 'date-fns';

export function getRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), {addSuffix: true});
}

export function getShortTimeDifference(dateString: string): string {
  const currentDate = new Date();
  const createdDate = new Date(dateString);

  const years = differenceInYears(currentDate, createdDate);
  if (years > 0) return `${years}y`;

  const months = differenceInMonths(currentDate, createdDate);
  if (months > 0) return `${months}M`;

  const weeks = differenceInWeeks(currentDate, createdDate);
  if (months > 0) return `${weeks}w`;

  const days = differenceInDays(currentDate, createdDate);
  if (days > 0) return `${days}d`;

  const hours = differenceInHours(currentDate, createdDate);
  if (hours > 0) return `${hours}h`;

  const minutes = differenceInMinutes(currentDate, createdDate);
  if (minutes > 0) return `${minutes}m`;

  const seconds = differenceInSeconds(currentDate, createdDate);
  return `${seconds}s`;
}
