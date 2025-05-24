const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface UploadResponse {
  summary: string;
}

export interface QueryResponse {
  response: string;
}

export class ApiService {
  static async uploadDocuments(files: File[]): Promise<UploadResponse> {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `Upload failed: ${response.statusText}`
      );
    }

    return response.json();
  }
  static async queryDocuments(query: string): Promise<QueryResponse> {
    const response = await fetch(`${API_BASE_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `Query failed: ${response.statusText}`
      );
    }

    return response.json();
  }
}
