export const API_BASE =
  (import.meta.env.VITE_API_BASE as string) || "http://localhost:8080";

export const ENDPOINTS = {
  webhookLoan: `${API_BASE}/api/webhook/fecredit`,
};
