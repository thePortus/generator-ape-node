# APE-Node

**Fullstack Angular-PostgreSQL-ExpressJS-NodeJS Starter**

By [David J. Thomas](mailto:dave.a.base@gmail.com), [thePortus.com](http://thePortus.com)

1. Install [PostgreSQL 9.x](https://www.postgresql.org/) or above
2. Create a database called Eleusis (use [PGAdmin](https://www.pgadmin.org/) to connect to your Postgres database if you are not familiar with Postgres Command Line)
3. Install [nodejs/npm](https://nodejs.org/en/)
4. Install gulp `npm install gulp-cli -g`
5. Clone this repository `git clone https://github.com/thePortus/eleusis-node.git`
6. Move inside the repo `cd eleusis-node`
7. Install local dependencies `npm install`
8. Move client-side dependencies with gulp `gulp`
9. Run the schema creation script `node server/models/build_schema.js`
10. Connect to your postgres database and upload the data found in server/import to each table
11. Start the server `npm start`
12. Go to `localhost:3000`
