# Prerequisite

You must have [Node.js](https://nodejs.org/en/), [PostgreSQL](https://www.postgresql.org/) database installed in your system.

In order to edit the code make sure to install an JavaScript IDE like [VS Code](https://code.visualstudio.com/) or your preffered one.

## Install Dependencies

```
 npm i
```

## Steps to perform before running the project

1. Make sure `npm i` command is successfully executed.
2. Make sure you have created a database named `demo` in your PostgreSQL.
3. Create a `.env` file in root directory and make sure to update `DATABASE_URL`, `JWT_SECRET` and `SENDGRID_API_KEY` to ensure your application will run properly. You can copy contents from [example.env](https://github.com/PathFinder5196/node-prisma-demo/blob/main/example.env) to get started quickly.
4. Once all above steps are complete go to the project root directory and run `npx prisma generate` this command in order to update the prisma client.
5. Once Prisma client is setup run `npx prisma migrate dev --preview-feature --skip-generate --name "init"` this command to generate schema in your project which will generate SQL files, which you can use to create table structures into the system.
6. Alternative to manually running SQL script you can run `npx prisma db pull` this command which will create table structures into the system.

## Run App

```
In dev mode "npm run dev"
```

## API Docs

You can access swagger documentation on [this URL](http://localhost:8080/api-docs) once your server is up and running.

- Version 1.0.0
- License MIT
