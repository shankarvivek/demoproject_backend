<<<<<<< HEAD

# Demoproject_backend

The backend for this project is a minimal mock middleware service that simulates TikTok Shop order processing and affiliate commission calculation.

**Important:** `.env.example` is only a reference showing how your real `.env` file should look—you must create your own `.env` with custom values before running the project.

Install dependencies with `npm install`, then run `cp .env.example .env` and update the environment variables for your MySQL database and server port. Create two tables—`orders` and `commissions`—using the MySQL schema provided in the project. Start the server using `npm start`, and it will run at `http://localhost:5000`.

The backend exposes a POST endpoint `/api/orders/receive` that simulates a TikTok Shop webhook: it saves the order, maps the affiliate ID to an internal partner ID, calculates a 10% commission, and stores the commission record.

A GET endpoint `/api/reports/commissions` provides a paginated commission report, including totals, enabling the frontend dashboard to display order and commission data. This backend uses Node.js, Express, MySQL, dotenv, and direct SQL queries.
