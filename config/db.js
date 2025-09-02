// import mysql from "mysql2/promise";

// const db = mysql.createPool(process.env.DATABASE_URL);

// export default db;

export async function getDB() {
  const mysql = await import("mysql2/promise");

  const pool = mysql.createPool(process.env.DATABASE_URL);

  return pool;
}
