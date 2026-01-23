# 🚀 React Admin Dashboard

A modern **admin dashboard application** built with **React 18, TypeScript and Ant Design**, focused on real-world patterns such as CRUD operations, role-based access, advanced filtering, optimistic UI updates and responsive layouts.

This project is designed as a **portfolio-grade application** demonstrating production-ready frontend architecture and best practices.

---

## ✨ Features

### 🧑‍💻 Authentication & Roles (Mock)

- Login / Logout flow
- Role-based permissions (`admin`, `manager`, `viewer`)
- Protected routes

---

### 👥 Users Management

- Users table with pagination
- Search with debounce
- Filters by:
    - Role
    - Status
    - Departments (TreeSelect)
    - Created date range
- Create / Edit user (Ant Design Form with validation)
- Delete user (with confirmation)
- Bulk actions:
    - Activate
    - Block
    - Delete (with confirm dialog)
- Inline status toggle (Switch)
- Audit info (Popover)

---

### ⚡ UX & State Management

- Optimistic UI updates
- Loading and error states
- Rollback on failed actions
- Local CRUD state (mocked backend)
- Debounced search
- Memoized calculations (`useMemo`, `useCallback`)

---

### 📊 Dashboard

- KPI cards (Total / Active / Blocked users)
- Donut chart with percentages
- Column chart (users by status)
- Line chart (users growth)
- Custom chart labels and tooltips
- Fully responsive layout
- Sidebar auto-collapse on smaller screens

---

### 📱 Responsive Design

- Mobile-first layout
- Responsive Grid (Ant Design `Row` / `Col`)
- Collapsible sidebar
- Works correctly on mobile, tablet and desktop screens

---

## 🛠 Tech Stack

- React 18
- TypeScript
- Vite
- Ant Design
- @ant-design/charts
- React Router
- Day.js
- Axios (mocked API)

---

## 📂 Project Structure

```txt
src/
├── auth/              # Auth context & hooks
├── components/        # Reusable UI components
├── constants/         # Static data (departments, enums)
├── hooks/             # Custom hooks (useDebounce)
├── layouts/           # Admin layout & sidebar
├── pages/
│   ├── Dashboard/
│   └── Users/
├── types/             # TypeScript types
├── utils/             # Helpers (fake API, etc.)
└── App.tsx
```
