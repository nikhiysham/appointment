import React from "react";
import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

export default function App() {
  async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 1;
    const currentDate = new Date();
    let { user_version: currentDbVersion } = await db.getFirstAsync<{
      user_version: number;
    }>("PRAGMA user_version");
    console.log("#DB VERSION: ", currentDbVersion);
    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }

    if (currentDbVersion === 0) {
      await db.execAsync(`
  PRAGMA journal_mode = 'wal';
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS appointment;
  DROP TABLE IF EXISTS rating;
  DROP TABLE IF EXISTS notification;
  CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL, name TEXT NOT NULL, phone TEXT NOT NULL, role TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT);
  CREATE TABLE appointment (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, reason TEXT, date TEXT, time TEXT, status TEXT, created_at TEXT NOT NULL, updated_at TEXT, user_id INTEGER REFERENCES users(id) );
  CREATE TABLE rating (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, value NOT NULL, created_at TEXT NOT NULL, updated_at TEXT, user_id INTEGER REFERENCES users(id) );
  CREATE TABLE notification (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, message TEXT, status TEXT, created_at TEXT NOT NULL, updated_at TEXT, user_id INTEGER REFERENCES users(id) );
  `);

      await db.runAsync(
        `INSERT INTO users(email, password, name, phone, role, created_at) VALUES(?,?,?,?,?,?)`,
        "user@gmail.com",
        "abcd1234",
        "Normal User",
        "123456789",
        "user",
        currentDate.toLocaleString()
      );
      await db.runAsync(
        `INSERT INTO users(email, password, name, phone, role, created_at) VALUES(?,?,?,?,?,?)`,
        "admin@gmail.com",
        "abcd1234",
        "Super Admin",
        "1234",
        "superadmin",
        currentDate.toLocaleString()
      );
    }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }

  return (
    <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="appointment/form"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="appointment/rating"
          options={{ headerTitle: "Rating" }}
        />
        <Stack.Screen
          name="appointment/list"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="appointment/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}
