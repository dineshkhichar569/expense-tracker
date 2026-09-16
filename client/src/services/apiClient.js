import axios from "axios";

/**
 * Single Axios instance used by frontend to communicate with the backeend API.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,

  /**
   * Handles API errors and returns a readable message.
   *
   * @param {import("axios").AxiosError} error
   * @param {Error} When the API request fails.
   */
  (error) => {
    let message;

    if (error.response) {
      message = error.response.data?.message || "Something weent wrong.";
    } else if (error.request) {
      //request was sent but no response
      message = "Cannot reach server. Please try again.";
    } else {
      //request was never sent
      message = error.message;
    }

    return Promise.reject(new Error(message));
  },
);

export default apiClient;
