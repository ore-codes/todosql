# Todo App

## Not just a todo app
It is a todo app with the backend built entirely in Postgres! Yes, no Express or any fancy backend library.

Postgres handles all the backend needs like authentication(tokens), password hashing, CRUD operations, JSON responses and more...

The client side is built with Next 15 and utilizes features like server actions, API routes, async server components and more...

## Prerequisites
**Docker** and **Node**(npm)

## How to run
1. `npm i` Install dependencies
2. `docker-compose up -d` Start docker (automatically runs migrations)
3. `npm run dev` Start dev server
4. Visit [http://localhost:3000](http://localhost:3000) in your browser
