const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

export const buildQueryString = (filters: any) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.append(key, value.toString());
  }
  return params.toString();
};


const safeFetch = async (url: string) => {
  try {
    const res = await fetch(url);
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || `HTTP ${res.status}`, errorCode: data.errorCode || `HTTP_${res.status}` };
      }
      return data;
    } else {
      const text = await res.text();
      return { success: false, message: `Unexpected response format (HTTP ${res.status})`, errorCode: 'INVALID_FORMAT' };
    }
  } catch (err: any) {
    return { success: false, message: err.message || 'Network error', errorCode: 'NETWORK_ERROR' };
  }
};

export const api = {
  async getProjects(filters: any = {}, page = 1, limit = 20) {
    const query = buildQueryString({ ...filters, page, limit });
    return await safeFetch(`${API_BASE_URL}/projects?${query}`);
  },
  async getProject(id: string) {
    return await safeFetch(`${API_BASE_URL}/projects/${id}`);
  },
  async getOverviewAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/overview?${query}`);
  },
  async getSummaryAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/summary?${query}`);
  },
  async getSectorAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/sectors?${query}`);
  },
  async getStateAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/gis/states?${query}`); // Phase 6 Requirement
  },
  async getMinistryAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/ministries?${query}`);
  },
  async getProgressAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/progress?${query}`);
  },
  async getCostAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/cost?${query}`);
  },
  async getStatusAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/status?${query}`);
  },
  async getRiskAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/risk?${query}`);
  },
  async getRiskDrivers(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/risk-drivers?${query}`);
  },
  async getRiskByState(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/risk-state?${query}`);
  },
  async getRiskBySector(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/risk-sector?${query}`);
  },
  async getHighRiskProjects(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/high-risk?${query}`);
  },
  async getDelayAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/delays?${query}`);
  },
  async getMonthlyAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/monthly?${query}`);
  },
  async getTrendsAnalytics(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/analytics/trends?${query}`);
  },
  async getDataSource() {
    return await safeFetch(`${API_BASE_URL}/analytics/data-source`);
  },
  async getCoverage() {
    return await safeFetch(`${API_BASE_URL}/analytics/coverage`);
  },
  async getAlerts(filters: any = {}) {
    const query = buildQueryString(filters);
    return await safeFetch(`${API_BASE_URL}/alerts?${query}`);
  }
};
