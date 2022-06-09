import mainaxios from "axios";

export const axios = mainaxios.create({
  baseURL: `https://bordex.l2x.tech/`,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

export const filterQurery = function(arr2d: [string, unknown][]): string {
  const query = arr2d
    .map(v => (v[1] !== "" && v[1] !== undefined ? `${v[0]}=${v[1]}` : ""))
    .filter(v => v)
    .join("&");
  return query.length ? `?${query}` : "";
};
