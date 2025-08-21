
# Digital Factory To‑Do (Full Stack)

A full‑stack to‑do web application with user authentication.

**Stack**: React (Vite) + MUI, React Router, Context API · Node.js + Express · MongoDB/Mongoose · JWT Auth

---

## Features
- Sign up, log in (JWT auth)
- Create, read, update, delete tasks
- User isolation: each user can only access their own tasks
- Validation & meaningful errors
- Responsive UI with Material UI
- Basic tests (optional, require test DB)

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local) or MongoDB Atlas connection string

### 1) Server (API)
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
```
API will start on `http://localhost:5000`.

### 2) Client (Web)
```bash
cd ../client
cp .env.example .env
# Ensure VITE_API_URL points to your API, e.g. http://localhost:5000/api
npm install
npm run dev
```
Frontend will be available on Vite's default: `http://localhost:5173`.

### Optional: Run both with a single command (from project root)
```bash
npm install
yarn || npm run dev
```
(Uses `concurrently` to run both client and server.)

---

## Environment Variables

### `server/.env`
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/df_todo
JWT_SECRET=supersecret_long_random_string
```

For tests (optional), you can also set `TEST_MONGODB_URI` in your environment.

### `client/.env`
```
VITE_API_URL=http://localhost:5000/api
```

---

## API
Base URL: `${SERVER_URL}/api`

- **POST** `/register` – create account `{ username, email, password }`
- **POST** `/login` – get JWT `{ email, password }`
- **GET** `/tasks` – list tasks (requires `Authorization: Bearer <token>`)
- **POST** `/tasks` – create task `{ title, description?, dueDate?, completed? }`
- **PUT** `/tasks/:id` – update
- **DELETE** `/tasks/:id` – delete

---

## Testing (Optional)
- Minimal Jest + Supertest scaffolding included in `server/tests`.
- To actually run tests, provide a test database via `TEST_MONGODB_URI` environment variable.

```bash
cd server
TEST_MONGODB_URI=mongodb://localhost:27017/df_todo_test npm test
```

> Tip: Tests will **skip** automatically if `TEST_MONGODB_URI` is not set.

---

## Deployment
- **DB**: MongoDB Atlas
- **API**: Render / Railway / Fly.io
  - Set `MONGODB_URI`, `JWT_SECRET`, `PORT`
- **Web**: Vercel / Netlify
  - Set `VITE_API_URL` to your deployed API base + `/api`
- Adjust CORS allowed origins in `server/src/server.js` if you want to restrict.

---

## License
MIT
