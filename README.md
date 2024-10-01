# **Task Manager App**

A trello clone task manager app has built with React.js for frontend and Nest.js for backend. The app allows users to log in with previously registered credentials in order to create and manage tasks. After log in, users can add, update or remove workspaces and tasks. The task are stored in PostgreSQL database which provided by Neon.tech. User profile also can be updated.


## Features

- Allow user to register, log in and log out
- Login can be done with previosly registered account
- Only logged in users have rights to create, update, remove or check the tasks
- User can update his/her own profile and tasks
- PostgreSQL database used to store data
- Prisma ORM used to retrive data from database
- React.js used for CSR
- Nest.js used for backend
- Bcrypt used to hash the user password
- JWT used for authentication
- React Hook form used to create forms
- Zod used for validation
- Material UI used for styling
- Toast notification use to improve UX
- TanStack query use to get data from backend and cache them
- Responsive design
- Turborepo used for monorepo
- Deployed on Render.com as Web Service

## How to run from local repository

1. Clone the repository
2. Run `npm install` command in your terminal inside the root folder
3. Set up PostgreSQL database with docker or with an online database.
4. Navigate to **backend** folder and create .env file and add enviromental variables:
   open ssl key should generate to JWT_SECRET<br>

```
PORT=4000
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
REFRESH_JWT_SECRET=
```

5. Run `npx prisma generate`
6. Navigate to **frontend** folder and create .env file and add environmental variables:

```
VITE_BACKEND_ADDR=http://localhost:4000
VITE_API_LOGIN=${VITE_BACKEND_ADDR}/api/auth/login
VITE_API_LOGOUT=${VITE_BACKEND_ADDR}/api/auth/logout
VITE_API_REGISTER=${VITE_BACKEND_ADDR}/api/auth/register
VITE_API_JWT_REFRESH=${VITE_BACKEND_ADDR}/api/auth/refresh
VITE_API_WORKSPACES=${VITE_BACKEND_ADDR}/api/workspaces
VITE_API_BOARDS=${VITE_BACKEND_ADDR}/api/boards
VITE_API_LISTS=${VITE_BACKEND_ADDR}/api/lists
VITE_API_CARDS=${VITE_BACKEND_ADDR}/api/cards
VITE_API_USER=${VITE_BACKEND_ADDR}/api/user
```

6. Navigat to **root** folder and run `npm run dev` command in your terminal
7. Backend server running at `http://localhost:4000/`
8. Frontend server running at `http://localhost:5173/`

