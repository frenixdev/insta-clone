export function getTimeAgo(date: string) {
  const now = new Date().getTime();
  const createdAt = new Date(date).getTime();
  const diff = now - createdAt;
  const min = Math.floor(diff / (1000 * 60))
  const hour = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const week = Math.floor( days / 7)
  const month = Math.floor(days / 30)
  const year = Math.floor( days / 365)

  if(min <1) return "now";
  if( hour < 1) return `${min}m ago`;
  if(days < 1) return `${hour}h ago`;
  if(week < 1) return `${days}d ago`;
  if( month < 1) return `${week}w ago`;
  if( year < 1) return `${month} mo ago`;

  return `${year}y`;
}
