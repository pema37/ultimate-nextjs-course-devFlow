import ROUTES from "@/constants/routes";
import { fetchHandler } from "./handlers/fetch";
import { IAccount } from "@/database/account.model";
import { IUser } from "@/database/user.model";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

// Centralized API utility
export const api = {
  auth: {
    // OAuth sign-in with user, provider, and account details
    oAuthSignIn: ({
      user,
      provider,
      providerAccountId,
    }: SignInWithOAuthParams) =>
      fetchHandler(`${API_BASE_URL}${ROUTES.SIGN_IN_WITH_OAUTH}`, {
        method: "POST",
        body: JSON.stringify({ user, provider, providerAccountId }),
      }),
  },
  users: {
    // Fetch all users
    getAll: () => fetchHandler(`${API_BASE_URL}/users`),

    // Fetch user by ID
    getById: (id: string) => fetchHandler(`${API_BASE_URL}/users/${id}`),

    // Fetch user by email
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

    // Update existing user by ID
    update: (id: string, userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      }),

    // Delete user by ID
    delete: (id: string) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, { method: "DELETE" }),
  },
  accounts: {
    // Fetch all accounts
    getAll: () => fetchHandler(`${API_BASE_URL}/accounts`),

    // Fetch account by ID
    getById: (id: string) => fetchHandler(`${API_BASE_URL}/accounts/${id}`),

    // Fetch account by provider ID
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

    // Update existing account by ID
    update: (id: string, accountData: Partial<IAccount>) =>
      fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(accountData),
      }),

    // Delete account by ID
    delete: (id: string) =>
      fetchHandler(`${API_BASE_URL}/accounts/${id}`, { method: "DELETE" }),
  },
};

