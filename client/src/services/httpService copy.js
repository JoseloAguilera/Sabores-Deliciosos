const axios = require("axios");
const { toast } = require("react-toastify");
const userService = require("./userService");

const token = userService.getToken();
console.log("token= "+token);
if (token) {
  axios.default.headers.common["x-auth-token"] = token;
}

axios.interceptors.response.use(
  null,
  (error) => {
    console.log(error.response);
    const expectedError = error.response && error.response.status >= 403;
    if (expectedError) {
      toast("An unexpected error occurred.");
    }
    return Promise.reject(error);
  }
);

module.exports = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
