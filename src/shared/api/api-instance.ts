const BASE_URL = "http://localhost:3000";

class ApiError extends Error {
  constructor(public response: Response) {
    super(`API Error: ${response.status} ${response.statusText}`);
  }
}

export const jsonApiInstance = async <T>(url: string, init?: RequestInit) => {
  const result = await fetch(`${BASE_URL}${url}`, {
    ...init
  });

  if (!result.ok) {
    throw new ApiError(result);
  }

  return (await result.json()) as Promise<T>;
};
