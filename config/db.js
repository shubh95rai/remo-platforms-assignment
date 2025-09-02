// import mysql from "mysql2/promise";

// const db = mysql.createPool(process.env.DATABASE_URL);

// export default db;

export async function getDB() {
  const mysql = await import("mysql2/promise");

  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  });

  return pool;
}