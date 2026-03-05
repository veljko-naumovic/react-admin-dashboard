#  React Admin Dashboard

A modern **admin dashboard application** built with **React 18, TypeScript and Ant Design**, focused on real-world frontend patterns such as CRUD operations, role-based access control, advanced filtering, optimistic UI updates and responsive layouts.

This project is designed as a **portfolio-grade application**, showcasing **production-ready frontend architecture and UX best practices**.

---

##  Features

###  Authentication & Roles (Mocked)

- Login / Logout flow
- Role-based permissions (`admin`, `manager`, `viewer`)
- Protected routes
- Persistent auth state (localStorage)

>  Authentication is mocked to keep the focus on frontend architecture and UX.

---

###  Users Management

- Users table with pagination
- Debounced search (name / email)
- Filters:
    - Role
    - Status
    - Departments (TreeSelect)
- Create / Edit user (Ant Design Form with validation)
- Delete user (confirmation dialog)
- Bulk actions:
    - Activate
    - Block
    - Delete (with confirm dialog)
- Inline status toggle (Switch with permissions)
- Audit info (Popover)

---

###  UX & State Management

- Optimistic UI updates
- Loading and error states
- Rollback on failed actions
- Local CRUD state (mocked backend)
- Debounced search
- Memoized calculations (`useMemo`, `useCallback`)
- Skeleton loading on dashboard

---

###  Dashboard

- KPI cards (Total / Active / Blocked users)
- Donut chart (users by role)
- Column chart (users by status)
- Line chart (users growth)
- Custom chart labels and tooltips
- Skeleton loading state
- Fully responsive layout

---

###  Responsive Design

- Mobile-first layout
- Responsive Grid (`Row` / `Col`)
- Collapsible sidebar
- Mobile sidebar drawer
- Stable layout without content shifting

---

##  Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **Ant Design**
- **@ant-design/charts**
- **React Router**
- **Day.js**
- **Axios** (mocked API)

---

##  Project Structure

````txt
src/
├── auth/                 # Authentication context, provider and hooks
├── components/           # Reusable UI components
│   ├── modals/           # Modal components (Create/Edit User)
│   ├── users/            # User-related UI (audit info, helpers)
│   └── layout/           # Admin layout, sidebar, header
├── constants/            # Static data (departments, enums, options)
├── hooks/                # Custom hooks (useDebounce)
├── pages/                # Application pages
│   ├── Dashboard/        # Dashboard page and charts
│   ├── Users/            # Users management page
│   └── Login/            # Login page
├── router/               # App routing & protected routes
├── types/                # TypeScript types and interfaces
├── utils/                # Helpers (fake API, permissions, formatters)
├── App.tsx
└── main.tsx

