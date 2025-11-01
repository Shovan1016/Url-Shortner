# URL Shortener 🚀

A simple **URL shortener service** built with **Node.js**, **PostgreSQL**, and **Docker**, featuring authentication and analytics (hit count tracking).

---

## 🧩 Prerequisites

- Node.js **v18+**
- **pnpm** or **npm**
- **Docker** & **Docker Compose**

---

## ⚙️ Environment Setup

Create a `.env` file in the project root:

```bash
PORT=8000
DATABASE_URL=postgres://postgres:admin@localhost:5432/postgres
JWT_SECRET="randomsecret"
````

---

## ▶️ Run the Project

```bash
docker compose up -d
pnpm db:studio
pnpm run dev
```

App runs at: **[http://localhost:8000](http://localhost:8000)**

---

## 🔗 API Routes

| Method     | Route               | Description                                       | Auth Required |
| ---------- | ------------------- | ------------------------------------------------- | ------------- |
| **POST**   | `/sign-up`          | Register a new user with email & password         | ❌             |
| **POST**   | `/login`            | Login existing user and return JWT token          | ❌             |
| **POST**   | `/shortner`         | Create a new short URL for a target link          | ✅             |
| **GET**    | `/getMyCodes`       | Fetch all short codes created by logged-in user   | ✅             |
| **DELETE** | `/deleteCode/:code` | Delete a short code owned by logged-in user       | ✅             |
| **GET**    | `/:shortCode`       | Redirect to the target URL and increase hit count | ❌             |

---

**Made with ❤️ using Node.js, PostgreSQL, and Docker**
