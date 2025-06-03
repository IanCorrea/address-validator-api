# 📦 Address Validator API

This API, built with **Node.js + Fastify**, validates and standardizes US-based addresses. It accepts a free-form address string and returns a structured version, indicating whether it’s valid, corrected, or unverifiable.

---

## 🚀 Technologies Used

- [Fastify](https://fastify.dev/) — Lightweight and high-performance web framework
- [@fastify/rate-limit](https://github.com/fastify/fastify-rate-limit) — Rate limiter plugin for DDoS protection
- **TypeScript** — For static typing and code clarity
- **ts-node-dev** — Auto-restart on file change

---

## 📂 Project Structure

```
src/
├── plugins/rateLimiter.ts          # Isolated rate limit plugin
├── routes/validateAddress.ts       # Main API route
├── services/addressService.ts      # Address validation and formatting logic
├── types/address.ts                # Type definitions (DTOs)
├── utils/formatter.ts              # Utility functions
└── server.ts                       # Fastify server bootstrap
```

---

## 📥 Endpoint

### `POST /validate-address`

**Request Body:**

```json
{
  "rawAddress": "1600 Amphitheatre Parkway, Mountain View, CA 94043"
}
```

**Response:**

```json
{
  "valid": true,
  "status": "valid",
  "address": {
    "street": "Amphitheatre Parkway",
    "number": "1600",
    "city": "Mountain View",
    "state": "CA",
    "zipCode": "94043"
  }
}
```

Possible `status` values:

- `valid` → Address is complete and valid
- `corrected` → Valid, but zip code was inferred
- `unverifiable` → Address could not be interpreted

---

## ⚙️ Running Locally

```bash
# Install dependencies
npm install

# Run in development mode with auto-restart
npm run dev

# Run test script with example addresses
npm run test:addresses
```

---

## 🔒 Rate Limiting

The API uses `@fastify/rate-limit` through a dedicated plugin (`src/plugins/rateLimiter.ts`).

- Current config: `max: 10 request every 5 seconds`
- Adds headers:
  - `x-ratelimit-limit`
  - `x-ratelimit-remaining`
  - `x-ratelimit-reset`
  - `Retry-After`

Example response when limit is exceeded:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 5
```

---

## 🧠 Technical Notes

- The project follows **KISS**, **DRY**, and partially **SOLID** (mainly SRP and separation of responsibilities).
- **DDD** was not applied because the scope is small and doesn't involve rich business logic.
- **Rate limiter** logic was extracted to `src/plugins/rateLimiter.ts`.
- The **regex** was improved to handle real-world edge cases like extra commas, missing ZIP, and spacing inconsistencies.
- **Test script** (`test/test-addresses.ts`) was added to simulate realistic address inputs.
- **ts-node-dev** is used for development experience with hot-reload.
- The `POST /validate-address` endpoint is tolerant to messy input but optimized for US-style addresses.
- The address normalization uses a lightweight utility `normalizeString` to clean up diacritics and spacing.

---

## 🤖 AI Usage

This project was scaffolded and optimized with the assistance of AI (ChatGPT) to quickly prototype a clean, structured, and production-ready MVP.

You may notice that the core prompts used to guide the design and logic are reflected in the **Technical Notes** section. These prompts represented the project's key requirements, analyzed in light of the expected functionality and scope. This ensured that decisions such as not applying full DDD, isolating plugins, applying KISS/DRY/SOLID where appropriate, and implementing a tolerant regex-based address parser were technically justified.

---
