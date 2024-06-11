export function formattedDateTime(utcString: string): {
  date: string;
  time: string;
} {
  const date = new Date(utcString);

  let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
  let month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

  let weekday = new Intl.DateTimeFormat("en", { weekday: "short" }).format(
    date
  );
  let hour = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    hour12: false,
  }).format(date);
  let minute = new Intl.DateTimeFormat("en", { minute: "2-digit" }).format(
    date
  );

  return {
    date: `${day} ${month} ${year}`,
    time: `${weekday} ${hour}:${minute}`,
  };
}
