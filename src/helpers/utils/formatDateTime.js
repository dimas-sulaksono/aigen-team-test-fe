export const formatDateTime = (date) => {
  const formattedDateTime = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date(date)).replace("pukul", "");

  return formattedDateTime;

};