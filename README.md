# React Admin Dashboard

Enterprise-style admin dashboard built with **React 18**, **TypeScript**, and **Ant Design**.  
The project simulates a real-world internal business application with role-based access, data tables, forms, and API-driven architecture.

---

## ✨ Features

- ⚛️ React 18 + TypeScript
- 🎨 Ant Design (enterprise UI components)
- 📊 Data tables with:
    - pagination
    - search
    - filters
- 📝 Forms with validation (Ant Design Form)
- 🔐 Mock authentication & role-based permissions
- 🧩 Modular and scalable folder structure
- ⚡ Performance optimizations (`useMemo`, `useCallback`)
- ⏳ Loading & error states
- 🔄 API-ready architecture (mock backend / real backend planned)

---

## 🧠 Roles & Permissions (Mock)

| Role    | View Data | Create | Edit | Delete |
| ------- | --------- | ------ | ---- | ------ |
| Admin   | ✅        | ✅     | ✅   | ✅     |
| Manager | ✅        | ✅     | ✅   | ❌     |
| Viewer  | ✅        | ❌     | ❌   | ❌     |

UI and actions are conditionally rendered based on the user role.

---

## 📁 Project Structure
