const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

export const buildQueryString = (filters: any) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.append(key, value.toString());
  }
  return params.toString();
};

export const api = {
  async getProjects(filters: any = {}, page = 1, limit = 20) {
    const query = buildQueryString({ ...filters, page, limit });
    const res = await fetch(`${API_BASE_URL}/projects?${query}`);
    return res.json();
  },
  async getProject(id: string) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`);
    return res.json();
  },
  async getSummaryAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    const res = await fetch(`${API_BASE_URL}/analytics/summary?${query}`);
    return res.json();
  },
  async getSectorAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    const res = await fetch(`${API_BASE_URL}/analytics/sectors?${query}`);
    return res.json();
  },
  async getStateAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    const res = await fetch(`${API_BASE_URL}/analytics/states?${query}`);
    return res.json();
  },
  async getMinistryAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    const res = await fetch(`${API_BASE_URL}/analytics/ministries?${query}`);
    return res.json();
  },
  async getProgressAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    const res = await fetch(`${API_BASE_URL}/analytics/progress?${query}`);
    return res.json();
  },
  async getCostAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    const res = await fetch(`${API_BASE_URL}/analytics/cost?${query}`);
    return res.json();
  },
  async getStatusAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    const res = await fetch(`${API_BASE_URL}/analytics/status?${query}`);
    return res.json();
  },
  async getRiskAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    const res = await fetch(`${API_BASE_URL}/analytics/risk?${query}`);
    return res.json();
  },
  async getHighRiskProjects(filters: any = {}) {
    const query = buildQueryString(filters);
    const res = await fetch(`${API_BASE_URL}/analytics/high-risk?${query}`);
    return res.json();
  },
  async getDelayAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    const res = await fetch(`${API_BASE_URL}/analytics/delays?${query}`);
    return res.json();
  },
  async getMonthlyAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    const res = await fetch(`${API_BASE_URL}/analytics/monthly?${query}`);
    return res.json();
  },
  async getDataSource() {
    const res = await fetch(`${API_BASE_URL}/analytics/data-source`);
    return res.json();
  },
  async getCoverage() {
    const res = await fetch(`${API_BASE_URL}/analytics/coverage`);
    return res.json();
  },
  async getAlerts(filters: any = {}) {
    const query = buildQueryString(filters);
    const res = await fetch(`${API_BASE_URL}/alerts?${query}`);
    return res.json();
  }
};
