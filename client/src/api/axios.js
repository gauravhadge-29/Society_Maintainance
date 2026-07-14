import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true, // Needed to send and receive cookies (like accessToken)
});

// Add an interceptor to handle token expiry or global errors if needed
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log all API errors globally to the browser console
    console.error(
      "🛑 [Frontend API Error]:",
      error.response?.data?.message || error.message,
      error.response?.data || error
    );

    // If we receive a 401 Unauthorized, we might want to redirect to login
    // We can handle this logic in components or here, but it's often better
    // to let the AuthContext handle state changes on 401s if we want to clear user state.
    return Promise.reject(error);
  }
);

export default api;
