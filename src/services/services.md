# 📦 Services Guide

This guide explains how to create a service in this folder. Follow these instructions **strictly** to maintain consistency and avoid errors.

---

### 🧭 Understand Context

* If a prior prompt led you to this `.md` file, use that **as context** to determine which service you need to create.
* Otherwise, follow the instructions below to create a service correctly.

---

## 🏗️ Service Structure

Each service should:

* Be placed in its own file inside the services folder and in the correct domain folder.
* **Group Structure:**

  * Organize services into **folders** based on domain, just like how `constants/data` is grouped.
  * If a folder already exists for a service group, **add the new service there**.
    Example:

  ```
  services/
  ├── auth/
  │   ├── login.ts
  │   ├── register.ts
  ├── business/
  │   ├── get-businesses.ts
  │   ├── get-business-by-id.ts
  └── invoices/
      ├── get-invoices.ts
      ├── get-invoice-metrics.ts
  ```
* If you're unsure where to place a service, **ask** before proceeding.

* Include:

  * A `production` function: Makes real API requests via the backend.
  * A `development` function: Simulates API responses using static data.
  * A default export: A function that switches between `production` and `development` based on `variables.SERVICE_ENV`.

Example Skeleton:

```typescript
import { variables } from "@/constants";
import axios from "@/lib/axios";

type Parameters = { /* optional */ };
type Response = { /* response type */ };

export async function production(data: Parameters): Promise<Response> {
  const response = await axios.post(`/api/path`, data);
  return response.data.data;
}

export async function development(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(/* mock data */), 2000);
  });
}

export default async function functionName(data: Parameters): Promise<Response> {
  if (variables.SERVICE_ENV === "development") return development();
  return production(data);
}
```

---

## 📥 Parameters (`Parameters` type)

* Defines the request payload.
* **Optional**: Can be omitted for GET requests without body.
* For static/mock data, only include `Parameters` if you **need** to filter by ID or other key.

Example:

```typescript
type Parameters = {
  email: string;
  password: string;
};
```

---

## 📤 Response (`Response` type)

**Important:**
- The `Response` type must **never** be unioned with `undefined` (e.g., `export type Response = Subscription | undefined;` is **wrong**).
- The `Response` type must always be the expected return type (e.g., `export type Response = Subscription;`).
- If a match is not found in the development function, always provide a fallback (see below).
```typescript
return new Promise((resolve) => {
  setTimeout(() => {
    resolve(subscriptions.find((s) => s.id === params.id) ?? subscriptions[0]);
  }, 2000);
});
```

Your `Response` type must match what the API or mock returns:

* **Void**: For endpoints like `POST /like` or `PATCH /status`.
* **Custom Object**: For data-specific responses.
* **Referenced Type**: Example: `UserProfile` from `@/types/user.types`.
* **Paginated Response**: For list endpoints, use `PaginatedResponse<T>` from `@/types/global.types`.

---

## 🌐 Production Function

* **Always import** `axios` from `@/lib/axios`.
* Return `response.data.data` (never the raw response).
* Use endpoint paths as defined in `@/api-docs`. **Do not create paths**. If unsure, **notify me**.

For paginated endpoints:

* Use `buildQueryString` from `@/lib/build-query-string` for query parameters.
* Example:

  ```typescript
  export async function production({ business_id, ...query }: Parameters): Promise<Response> {
    const query_string = buildQueryString(query);
    const response = await axios.get(`/invoices?business_id=${business_id}&${query_string}`);
    return response.data.data;
  }
  ```

---

## 🧪 Development Function

* Simulate API responses using static data from `@/constants/data`.
* Use `setTimeout` with 2s delay.
* For simple responses:

  ```typescript
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 2000);
  });
  ```
* For paginated responses:

  ```typescript
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      docs: invoices,
      totalDocs: invoices.length,
      limit: 20,
      page: 1,
      totalPages: 1,
      hasNextPage: false,
      nextPage: null,
      hasPrevPage: false,
      prevPage: null,
      pagingCounter: 1,
    }), 2000);
  });
  ```

* **When finding a match by ID in the development function, always provide a fallback to the first item in the array:**

  ```typescript
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(subscriptions.find((s) => s.id === params.id) ?? subscriptions[0]);
    }, 2000);
  });
  ```

If data is **not available** in constants, **notify me**.

---

## 📑 Response Types

### 1️⃣ Normal Response

For single or action-based responses:

```typescript
type Response = {
  user: UserProfile;
  token: string;
};
```

Example:

```typescript
export async function production(data: Parameters): Promise<Response> {
  const response = await axios.post(`/auth/login`, data);
  const user = await axios.get("/me", { headers: { Authorization: `Bearer ${response.data.data.token}` } });
  return { user: user.data.data, token: response.data.data.token };
}
```

---

### 2️⃣ Paginated Response

For list endpoints:

* `PaginatedResponse<T>` must be used from `@/types/global.types`.

Example:

```typescript
type Response = PaginatedResponse<Invoice>;

type Parameters = PaginationQuery & {
  business_id: string;
  status?: string;
  search?: string;
};

export async function production({ business_id, ...query }: Parameters): Promise<Response> {
  const query_string = buildQueryString(query);
  const response = await axios.get(`/invoices?business_id=${business_id}&${query_string}`);
  return response.data.data;
}
```

Pagination types:

```typescript
// from @/types/global.types
export type PaginationQuery = {
  page: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  nextPage: number | null;
  hasPrevPage: boolean;
  prevPage: number | null;
  pagingCounter: number;
};
```

---

## 🚨 Important Reminders

✅ Always:

* Use `axios` from `@/lib/axios`.
* Match endpoint paths from `@/api-docs`. If not found, **notify me**.
* Import static data from `@/constants/data`. If data is missing, **notify me**.
* Return `response.data.data` from `production`.
* Use `PaginationQuery` and `PaginatedResponse` from `@/types/global.types` for list endpoints.
* Simulate responses in `development` with proper static data.
* Keep parameter types accurate—optional where necessary, required where crucial.
* **Never use a union with undefined for the Response type. Always return the expected type.**
* **When finding by ID in development, always provide a fallback to the first item in the array.**

---


