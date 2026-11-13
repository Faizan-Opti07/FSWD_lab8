# FSWD Lab 8 — VOID IZ VACCUM Backend API

Modular NestJS backend for **FSWD Lab 8** (Void Iz Vaccum storefront coursework).

## Architecture
Strictly follows the **Controllers**, **Modules**, and **Services** pattern:
- **No Pipes or ValidationPipe** (as requested)
- **No Guards or Auth** (as requested)
- **No Database** — Clean in-memory storage within each service

---

## Modules Overview
1. **ProductsModule** (`src/products/`)
   - `ProductsController`
   - `ProductsService`
   - Seeded with products from `T6_Void_iz_VAccum_Store.html`
2. **OrdersModule** (`src/orders/`)
   - `OrdersController`
   - `OrdersService`
   - Handles the bag and checkout demo order flow
3. **ReviewsModule** (`src/reviews/`)
   - `ReviewsController`
   - `ReviewsService`
   - Handles storefront community reviews
4. **NewsletterModule** (`src/newsletter/`)
   - `NewsletterController`
   - `NewsletterService`
   - Handles newsletter subscription requests

---

## Running the Server
```bash
# Development mode
npm run start:dev

# Build & Run production
npm run build
npm run start:prod
```
The server runs on **`http://localhost:3000`**.

---

## Postman API Testing
Import the included `postman_collection.json` into Postman (`File -> Import -> select postman_collection.json`).

### Tested Endpoints:
| Method | Endpoint | Description | Query / Body |
|---|---|---|---|
| `GET` | `/` | API Info & Root Health | None |
| `GET` | `/products` | List all products | `?search=jacket&tag=BESTSELLER` |
| `GET` | `/products/:id` | Single product | e.g. `/products/1` |
| `POST`| `/products` | Create product | JSON Body: `{ name, category, price, tag, ... }` |
| `GET` | `/orders` | List orders | `?email=faizan` |
| `POST`| `/orders` | Checkout order | JSON Body: `{ firstName, lastName, email, address, items }` |
| `GET` | `/reviews` | Community reviews | `?rating=5&search=fit` |
| `POST`| `/reviews` | Submit review | JSON Body: `{ rating, comment, author }` |
| `GET` | `/newsletter` | View subscribers | None |
| `POST`| `/newsletter/subscribe` | Subscribe email | JSON Body: `{ email }` |

