import React from "react";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function App() {
  return (
    <SQLiteProvider databaseName="test.db">
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="appointment/form"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="appointment/list"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="appointment/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </SQLiteProvider>
  );
}
