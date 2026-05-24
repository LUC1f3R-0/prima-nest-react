import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};

  config.headers["X-Request-Id"] = crypto.randomUUID();

  const method = config.method?.toLowerCase();

  if (["post", "put", "patch", "delete"].includes(method ?? "")) {
    config.headers["Idempotency-Key"] = crypto.randomUUID();
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
    delete config.headers["content-type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default AxiosInstance;