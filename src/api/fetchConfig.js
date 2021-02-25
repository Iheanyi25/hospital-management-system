export const fetchConfig = ({ url, params, data = {}, method, headers = {} }) => {
  if (!url) return null;

  return {
    url,
    method,
    // headers: {
    //   "Content-Type": "application/json-patch+json",
    //   "Access-Control-Allow-Origin": "*",
    //   ...headers
    // },
    // headers: { "Content-Type": "application/json-patch+json",  Authorization: `Bearer ${user.token}` },
    data,
    params,
    redirect: "follow",
  };
};
