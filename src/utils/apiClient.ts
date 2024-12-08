interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
}

class ApiClient {
  private baseUrl: string;
  private authToken: string | null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.authToken = null;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private async handleResponse(response: Response) {
    if (response.status === 403) {
      // Handle authentication error
      this.authToken = null;
      throw new Error('Authentication failed');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...config.headers,
    };

    if (config.requiresAuth && this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...config,
      headers,
    });

    return this.handleResponse(response);
  }

  // Convenience methods
  async get<T>(endpoint: string, config: RequestConfig = {}) {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, data: any, config: RequestConfig = {}) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL || '');
