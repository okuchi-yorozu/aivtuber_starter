import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
export function toDurationString(iso8601: string): string {
  const duration = dayjs.duration(iso8601);
  return duration.format("HH[時間]mm[分]ss[秒]");
}

export function toSeconds(iso8601: string): number {
  const duration = dayjs.duration(iso8601);
  return duration.asSeconds();
}
