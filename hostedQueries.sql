
CREATE TABLE users 
( 
   id SERIAL PRIMARY KEY,
   username  varchar(200) not null,
   email varchar(200) not null unique,
   password varchar(200) not null,
   register_date varchar(255) not null
)

CREATE TABLE board
 (
    id SERIAL PRIMARY KEY,
    boardname VARCHAR(100) NOT NULL,
    userid INTEGER REFERENCES users(id) 
)


CREATE TABLE lists
 (
    id SERIAL PRIMARY KEY,
    boardid INTEGER REFERENCES board(id) ON DELETE RESTRICT,
    listname VARCHAR(100) NOT NULL,
    position DOUBLE PRECISION
)

CREATE TABLE cards
 (
    id SERIAL PRIMARY KEY,
    boardid INTEGER REFERENCES board(id) ON DELETE RESTRICT,
    listid INTEGER REFERENCES lists(id) ON DELETE RESTRICT,
    description text NOT NULL,
    duedate DATE NOT NULL DEFAULT CURRENT_DATE,
    isarchive  BOOLEAN NOT NULL,
    position DOUBLE PRECISION
)


/* ffrom .env file /*
NODE_ENV=development
PORT=5000
jwtSecret=secret
USER=postgres
PASSWORD=password123
HOST=localhost
DATABASE=trellodb
DB_PORT=5432

/*
const pool = new Pool({
  user: 'postgres',
  password: 'password123',
  host: 'localhost',
  database: 'trellodb',
  port: 5432
})
*/
