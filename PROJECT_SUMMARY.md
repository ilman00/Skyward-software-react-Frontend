
# Skyward React Frontend: Project Overview

This document provides a comprehensive overview of the `skyward-react-frontend` project, intended to be used as a guide for understanding its structure, conventions, and core functionalities.

## 1. Project Purpose

The project is a web application for **Skyward**, a business that appears to be in real estate or investment management. It serves as a dashboard and management tool for different user roles: `admin`, `staff`, and `marketer`.

The application's core responsibilities include:
- Managing **SMDs** (a central business concept, likely "Sales & Marketing Deals" or a similar term). This includes adding, listing, and closing (selling) SMDs.
- Managing **Customers** and **Marketers**.
- Tracking finances, including **Rents**, **Payouts**, and **Payments**.
- Generating and managing **Contracts**.
- User and **Staff** management.

The application has distinct dashboards and layouts tailored to the responsibilities of each user role.

## 2. Technology Stack

The project is built with a modern React ecosystem. Adherence to the patterns and libraries listed below is crucial.

- **Framework**: [React](https://react.dev/) v19
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router DOM](https://reactrouter.com/) v7
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4. The configuration is in `tailwind.config.js`, and it's integrated via PostCSS.
- **HTTP Client**: [Axios](https://axios-http.com/). A pre-configured client is available and should be used for all API communication.
- **State Management**: React Context API is used for global state like authentication. For local state, React Hooks (`useState`, `useEffect`, etc.) are standard.
- **Form Management**: [React Hook Form](https://react-hook-form.com/) v7 is used for all forms, with [Zod](https://zod.dev/) for schema-based validation.
- **UI Components & Libraries**:
  - **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react).
  - **Notifications**: [React Hot Toast](https://react-hot-toast.com/).
  - **Dropdowns**: [React Select](https://react-select.com/).
  - **Printing**: [React to Print](https://github.com/gregnb/react-to-print) for generating printable components, especially for contracts.
- **Linting**: ESLint with TypeScript support. Configuration is in `eslint.config.js`.

## 3. Project Structure

The `src` directory is organized by feature and domain.

```
src/
├── api/
│   └── client.ts       # Central Axios client configuration and interceptors.
├── auth/
│   ├── AuthProvider.tsx  # Global provider for authentication state.
│   ├── useAuth.ts        # Hook to access auth context (user, roles, etc.).
│   └── types.ts          # TypeScript types for authentication.
├── components/
│   ├── AdminDashboard/ # Components specific to the Admin dashboard.
│   ├── Customers/      # Components for customer management (forms, lists).
│   ├── Marketer/       # Components for the Marketer dashboard.
│   └── ...             # Other shared or feature-specific components.
├── hooks/
│   └── useDebounce.ts  # Example of a custom hook.
├── layouts/
│   ├── AdminLayout.tsx   # Layout for Admin/Staff views (sidebar, navbar).
│   ├── MarketerLayout.tsx# Layout for Marketer views.
│   └── AppLayouts.tsx    # Public layout for pages like login, landing, etc.
├── pages/
│   ├── Admin/
│   │   └── Dashboard.tsx # Main admin dashboard page.
│   ├── Marketers/
│   │   └── Dashboard.tsx # Main marketer dashboard page.
│   ├── Customers/
│   └── ...             # All page components, organized by feature.
├── router/
│   └── AppRouter.tsx   # Defines all application routes and connects them to pages/layouts.
├── routes/
│   ├── ProtectedRoutes.tsx # Component to guard routes based on user role.
│   └── roleHome.ts     # Maps roles to their default homepages.
├── services/
│   ├── CustomerAPIs.ts # Functions for interacting with the customer-related backend endpoints.
│   ├── SmdAPIs.ts      # Functions for SMD-related API calls.
│   └── ...             # All API interaction logic is centralized here.
├── types/
│   └── smd.types.ts    # Domain-specific TypeScript types.
└── ...
```

## 4. Core Concepts & Conventions

### Authentication & Authorization

- **Flow**: Authentication is token-based (JWT). The user logs in, and an `accessToken` is stored in memory. This token is sent with every subsequent API request.
- **`api/client.ts`**: This file is critical. It contains an Axios instance with interceptors that:
  1.  Automatically attach the `Authorization: Bearer <token>` header.
  2.  Handle token expiration by calling a `/auth/refresh` endpoint to get a new token.
  3.  Queue and retry failed requests that occurred during token refresh.
  4.  Handle specific error codes (e.g., `ACCOUNT_SUSPENDED`) by logging the user out.
- **`auth/AuthProvider.tsx`**: This component wraps the entire app. On initial load, it calls the `/auth/refresh` endpoint to restore the user's session. It provides the `user` object, `isAuthenticated` status, and `login`/`logout` functions to the rest of the app via `useAuth()`.
- **`routes/ProtectedRoutes.tsx`**: This component is used in `AppRouter.tsx` to protect routes. It takes an array of allowed `roles` and redirects unauthorized users.

### API Communication

- **Centralized Client**: Always import and use the `apiClient` from `api/client.ts` for making HTTP requests. Do not use `axios.create()` or the default `axios` object elsewhere.
- **Service Layer**: All API calls should be abstracted into functions within the `src/services/` directory. For example, to fetch a customer, you would call a function like `getCustomerById(id)` from `src/services/CustomerAPIs.ts`, which in turn uses the `apiClient`. This keeps component logic clean.
- **Environment Variables**: The API base URL is configured via `import.meta.env.VITE_API_BASE_URL`.

### Form Handling

- **Standard**: Use `react-hook-form` for all forms.
- **Validation**: Define a `zod` schema for the form data. Use the `@hookform/resolvers/zod` package to connect it to `react-hook-form`.
- **UI**: Components should be built to be compatible with `react-hook-form`'s `Controller` component for easy integration.

### Styling

- **Utility-First**: Use Tailwind CSS classes directly in your JSX for styling.
- **Customization**: If new global styles or component styles are needed, prefer to extend the theme in `tailwind.config.js` rather than writing custom CSS files.
- **Fonts**: The project uses a custom font (`NotoNastaliqUrdu-Regular.ttf`) which is loaded in the `public/fonts` directory and likely applied via CSS.

## 5. How to Add a New Feature (Example: "Projects" management)

1.  **Types**: Define the `Project` type in a new file `src/types/project.types.ts`.
2.  **API Service**: Create `src/services/ProjectAPIs.ts`. Add functions like `getProjects()`, `createProject(data)`, etc., using the `apiClient`.
3.  **Components**: Create a new directory `src/components/Projects/`. Add components like `ProjectList.tsx`, `ProjectForm.tsx`, etc.
4.  **Pages**: Create a new directory `src/pages/Projects/`. Add page components like `ProjectListPage.tsx` and `CreateProjectPage.tsx`.
5.  **Routing**:
    - In `src/router/AppRouter.tsx`, add new `Route` definitions for the new pages.
    - Wrap them in the appropriate layout (`AdminLayout`) and `ProtectedRoute` with the correct roles (`admin`, `staff`, etc.).
    - Add a link to the new page in the sidebar component (likely `src/components/AdminDashboard/Sidebar.tsx`).
