import { IAccount } from "@/database/account.model"; // Account model interface
import { IUser } from "@/database/user.model"; // User model interface
import { fetchHandler } from "./handlers/fetch"; // Custom fetch utility

// Base URL configuration with a fallback for local development
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

// API Client
export const api = {
  users: {
    // Fetch all users
    getAll: () => fetchHandler(`${API_BASE_URL}/users`),

    // Fetch a user by ID
    getById: (id: string) => fetchHandler(`${API_BASE_URL}/users/${id}`),

    // Fetch a user by email
    getByEmail: (email: string) =>
      fetchHandler(`${API_BASE_URL}/users/email`, {
        method: "POST",
        body: JSON.stringify({ email }),
      }),

    // Create a new user
    create: (userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),

    // Update an existing user
    update: (id: string, userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      }),

    // Delete a user by ID
    delete: (id: string) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
      }),
  },

  accounts: {
    // Fetch all accounts
    getAll: () => fetchHandler(`${API_BASE_URL}/accounts`),

    // Fetch an account by ID
    getById: (id: string) => fetchHandler(`${API_BASE_URL}/accounts/${id}`),

    // Fetch an account by providerAccountId
    getByProvider: (providerAccountId: string) =>
      fetchHandler(`${API_BASE_URL}/accounts/provider`, {
        method: "POST",
        body: JSON.stringify({ providerAccountId }),
      }),

    // Create a new account
    create: (accountData: Partial<IAccount>) =>
      fetchHandler(`${API_BASE_URL}/accounts`, {
        method: "POST",
        body: JSON.stringify(accountData),
      }),

    // Update an existing account
    update: (id: string, accountData: Partial<IAccount>) =>
      fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(accountData),
      }),

    // Delete an account by ID
    delete: (id: string) =>
      fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
        method: "DELETE",
      }),
  },
};

