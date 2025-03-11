type ApiParams = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: object;
  baseUrl?: string;
};

export default function callApi<Response>(
  path: string,
  { method = "GET", body, baseUrl = "/api" }: ApiParams = {}
): Promise<Response> {
  return fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then((res) => res.json());
}
