# Todo App

## Not just a todo app
It is a todo app with the backend built entirely in Postgres! Yes, no Express or any fancy backend library.

Postgres handles all the backend needs like authentication(tokens), password hashing, CRUD operations, JSON responses and more...

The client side is built with Next 15 and utilizes features like server actions, API routes, async server components and more...

## How to run
1. `npm i` Install dependencies
2. `cd server`
3. `docker-compose up -d` Start docker (automatically runs migrations)
4. `cd ../` Back to root
5. `npm run dev` Start dev server
6. Visit [http://localhost:3000](http://localhost:3000)
