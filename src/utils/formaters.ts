export function dateFormater(arg: string) {
  const formatedDate = arg
    .split("-")
    .reverse()
    .join("-");

  return formatedDate;
}

export function dateTimeFormater(arg: string) {
  const date = arg.match(/\d+-\d+-\d+/gm);
  const time = arg.match(/\d{2}:\d{2}:\d{2}/gm);

  if (!date || !date.length || !time || !time.length) {
    return "27-2-2022";
  }
  return `${dateFormater(date[0])} [${time[0]}]`;
}
