import { httpRequest } from "./config";

export const postData = (url, data) => {
  const config = {
    method: "POST",
    url,
    data,
  };
  return httpRequest(config);
};

export const getData = (url) => {
  const config = {
    method: "GET",
    url,
  };
  return httpRequest(config);
};

export const putData = (url, data) => {
  const config = {
    method: "PUT",
    url,
    data,
  };
  return httpRequest(config);
};

export const deleteData = (url) => {
  const config = {
    method: "DELETE",
    url,
  };
  return httpRequest(config);
};
