<div align="center">

#  Expense Tracker

**A full-stack MERN app for tracking income and expenses, with a monthly dashboard, filterable transaction history, and category analytics.**

### 🔗 [Live Demo](https://expense-tracker.wollverinel97.workers.dev/)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Reference](#-api-reference)
- [Data Model](#-data-model)
- [Categories](#-categories)
- [Roadmap : Future Scope](#-roadmap)
- [Author](#-author)

---

## ==> Overview

Expense Tracker is a personal finance app split into two parts:

- **`client/`**: a React 19 + Vite single-page app styled with Tailwind CSS v4, with charts from Recharts.
- **`server/`**: a REST API built with Express 5 and MongoDB (Mongoose).

You record each transaction as **income** or an **expense**, with a category, date, payment method, and optional note. The app shows your net balance, monthly totals, a donut chart of spending by category, and a filterable list of every transaction.

---

## ==> Features

### => Dashboard
- **Net balance**: total income minus total expenses.
- **Month picker**: shows income and expense for any chosen month (`YYYY-MM`).
- **Recent transactions**: the 6 most recent entries, with a *See all* link.
- **Category split**: a donut chart of income and expense by category.

### => Transactions
- A full table of transactions with the total record count.
- **Filters**:
  - **Type**: All / Expense / Income
  - **Category**: options change to match the selected type
  - **Date range**: From / To (the *To* date includes the whole day)
  - **Clear Filter** resets everything
- **Edit** a transaction: the modal opens with its values already filled in.
- **Delete** a transaction: it disappears from the list right away, with no page reload.

### => Analytics
- Switch between the **Expense** and **Income** views.
- Summary cards for **Total Income**, **Total Expense**, and **Net Saving**.
- A donut chart and a **Top Categories** list ranked by amount, each with a progress bar and its share of the total.

### => Add / Update Transaction Modal
- Expense / Income toggle, amount, category grid with icons, date, note, and payment method (**Cash / UPI / Card**).
- Checks in the browser before sending (amount > 0, category required); the server validates again.
- New and edited transactions appear in the UI immediately.

### => Responsive UI
- **Desktop**: a fixed sidebar with navigation and an *Add Transactions* button.
- **Mobile**: a bottom navigation bar with a floating **＋** button, and the form opens as a bottom sheet.
- Amounts are shown in Indian Rupees (₹) with `en-IN` number formatting.

---

## ==> Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 8, React Router 7 |
| **Styling** | Tailwind CSS 4 (`@tailwindcss/vite`) |
| **Charts** | Recharts 3 |
| **Icons** | Lucide React |
| **HTTP client** | Axios (shared instance with an error interceptor) |
| **Backend** | Node.js, Express 5 (ES Modules) |
| **Database** | MongoDB with Mongoose 9 |
| **Tooling** | ESLint 10, Nodemon, dotenv |

---

## ==> Architecture

**How it works:**
- `MainLayout` loads all transactions once when the app starts and shares them with every page through React Router's `<Outlet context>`.
- `utils/transactionUtils.js -> getTransactionSummary()` calculates totals, monthly figures, and per-category groupings in the browser.
- The Transactions page sends its filters to the API as query parameters, and the server turns them into a MongoDB query in `buildExpenseQuery()`.
- The server connects to MongoDB **before** it starts listening. If the connection fails, the process exits.

---

## 📁 Project Structure

```
expense-tracker/
|-- client/                          # React frontend
|   |-- index.html
|   |-- vite.config.js               # React + Tailwind plugins
|   |-- eslint.config.js
|   |-- src/
|       |-- main.jsx                 # Entry point, BrowserRouter
|       |-- App.jsx                  # Route definitions
|       |-- index.css                # Tailwind import
|       |-- components/
|       |   |-- layout/
|       |   |   |-- MainLayout.jsx         # Shell + global transaction state
|       |   |   |-- Sidebar.jsx            # Desktop navigation
|       |   |   |-- BottomBar.jsx          # Mobile navigation
|       |   |-- ExpenseForm.jsx            # Add / update modal
|       |   |-- FilterBar.jsx              # Type / category / date filters
|       |   |-- SelectDropdown.jsx         # Custom category dropdown
|       |   |-- TransactionTable.jsx       # Table with edit / delete
|       |   |-- RecentTransactionList.jsx
|       |   |-- ChartComponent.jsx         # Recharts donut + legend
|       |   |-- EmptyState.jsx
|       |-- pages/
|       |   |-- DashboardPage.jsx
|       |   |-- TransactionsPage.jsx
|       |   |-- AnalyticsPage.jsx
|       |-- services/
|       |   |-- apiClient.js         # Axios instance + error interceptor
|       |   |-- ExpenseService.js    # CRUD API calls
|       |-- utils/
|           |-- constants.js         # Categories, icons, colors, formatDate
|           |-- transactionUtils.js  # Totals & category aggregation
|
|-- server/                          # Express backend
    |-- server.js                    # App setup, CORS, routes, startup
    |-- .env.example
    |-- src/
        |-- config/
        |   |-- db.js             # MongoDB connection
        |-- models/
        |   |-- Expense.js        # Mongoose schema + validation
        |-- controllers/
        |   |-- expenseController.js
        |-- routes/
        |   |-- expenseRoutes.js
        |-- utils/
        |   |-- buildExpenseQuery.js
        |-- middleware/
            |-- errorHandler.js
            |-- notFound.js
```

---

## ==> Getting Started

### Prerequisites

- **Node.js** 20.19+ or 22.12+ (required by Vite 8)
- **npm**
- **MongoDB**, either a local instance or a MongoDB Atlas cluster

### 1. Clone the repository

```bash
git clone https://github.com/dineshkhichar569/expense-tracker.git
cd expense-tracker
```

### 2. Set up the server

```bash
cd server
npm install
cp .env.example .env      
npm run dev             
```

You should see:

```
MongoDB connected
Server started at http://localhost:4050
```

### 3. Set up the client

Open a second terminal:

```bash
cd client
npm install
echo "VITE_API_URL=http://localhost:4050/api" > .env
npm run dev               
```

### 4. Check that it works

- Health check: `GET http://localhost:4050/api/health` should return `Hello World`
- Open **http://localhost:5173** in your browser

---

## ==> Environment Variables

### `server/.env`

| Variable | Required | Example | Description |
|---|---|---|---|
| `PORT` | No | `4050` | API port (defaults to `4050`) |
| `MONGO_URI` | **Yes** | `mongodb://localhost:27017/expense-tracker` | MongoDB connection string |
| `VITE_API_URL` | **Yes** | `http://localhost:5173` | The **client's origin**, used as the allowed CORS origin |


### `client/.env`

| Variable | Required | Example | Description |
|---|---|---|---|
| `VITE_API_URL` | **Yes** | `http://localhost:4050/api` | Base URL for all API requests (include `/api`) |

---

## ==> Available Scripts

### Server (`/server`)

| Command | Description |
|---|---|
| `npm run dev` | Start with Nodemon (restarts on file changes) |
| `npm start` | Start with Node (production) |

### Client (`/client`)

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |

---

## ==> API Reference

**Base URL:** `http://localhost:4050/api`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/expenses` | List transactions (newest first), with optional filters |
| `POST` | `/expenses` | Create a transaction |
| `PATCH` | `/expenses/:id` | Update a transaction |
| `DELETE` | `/expenses/:id` | Delete a transaction |

### `GET /expenses`: query parameters

| Param | Type | Example | Behaviour |
|---|---|---|---|
| `type` | `income` \| `expense` | `?type=expense` | Filter by type |
| `category` | string | `?category=food` | Filter by category (case-insensitive) |
| `from` | date | `?from=2026-09-01` | Dates on or after this day |
| `to` | date | `?to=2026-09-30` | Dates on or before this day (includes the whole day, up to 23:59:59.999) |

**Response `200`**
```json
{
  "success": true,
  "data": [
    {
      "_id": "66f0c1...",
      "type": "expense",
      "amount": 250,
      "category": "food",
      "date": "2026-09-18T00:00:00.000Z",
      "note": "Lunch",
      "paymentMethod": "upi",
      "createdAt": "2026-09-18T10:12:44.120Z",
      "updatedAt": "2026-09-18T10:12:44.120Z"
    }
  ]
}
```

### `POST /expenses`

**Request body**
```json
{
  "type": "expense",
  "amount": 250,
  "category": "food",
  "date": "2026-09-18",
  "note": "Lunch",
  "paymentMethod": "upi"
}
```
Only these six fields are saved. Anything else in the body is ignored.

**Response `201`**
```json
{ "success": true, "message": "Expense created succesfully.", "data": { "...": "..." } }
```

### `PATCH /expenses/:id`

Send any subset of the fields above.

- **`200`**: `{ "message": "Expense updated succesfully.", "data": { ... } }`
- **`404`**: `{ "message": "Expense not found." }`

### `DELETE /expenses/:id`

- **`200`**: `{ "message": "Expense Deleted Successfully." }`
- **`404`**: `{ "message": "Expense not found." }`

### Errors

| Status | When |
|---|---|
| `404` | Unknown route: `{ "success": false, "message": "Route not found : /api/..." }` |
| `500` | Unhandled server error: `{ "success": false, "message": "Server Error" }` |


---

## ==> Data Model

**Collection:** `expenses` (Mongoose model `expense`, with `timestamps: true`)

| Field | Type | Rules |
|---|---|---|
| `type` | String | Required · `expense` \| `income` · default `expense` · lowercased |
| `amount` | Number | Required · min `0.01` · must be a finite number |
| `category` | String | Required · lowercased · **must belong to the chosen `type`** |
| `date` | Date | Required · default `Date.now` · **cannot be in the future** |
| `note` | String | Optional · trimmed · max 200 characters |
| `paymentMethod` | String | `cash` \| `upi` \| `card` · default `cash` |
| `createdAt` / `updatedAt` | Date | Added automatically |

---

## ==> Categories

Every category has its own icon and color, shared by the form, the table, and the charts (`client/src/utils/constants.js`).

| Expense | Income |
|---|---|
| Food | Salary |
| Transport | Freelance |
| Bills | Investment |
| Shopping | Gift |
| Health | Other |
| Entertainment | |
| Other | |

---

## ==> Roadmap (Future Scope)

- [ ] User authentication (JWT) so each user has their own transactions
- [ ] Run schema validators on update (`runValidators: true`)
- [ ] Return field-level validation errors as `400` responses
- [ ] Budgets and alerts for each category
- [ ] Monthly trend chart (income vs. expense over time)
- [ ] Export transactions to CSV
- [ ] Dark mode
- [ ] Unit and API tests

---

## ==> Author

**Dinesh Khichar**
Fullstack & DevOps Enthusiast | B.Tech CSE @ DIT University

 [LinkedIn : https://linkedin.com/in/dineshkhichar](https://linkedin.com/in/dineshkhichar)  
 [GitHub : https://github.com/dineshkhichar569](https://github.com/dineshkhichar569)  
 [Portfolio : https://dineshk.site/](https://dineshk.site/)

##  Acknowledgement

Thanks for checking out my portfolio!
If you like it, please ⭐⭐ star this repository and feel free to fork or use it as inspiration.