// This is a mock authentication service.
// In a real application, you would make API calls to your backend.

import type { LoginFormValues, RegisterFormValues } from '@/lib/schemas';

export interface User {
  id: string;
  name: string;
  email: string;
}

// Mock user database
const users: User[] = [
  { id: '1', name: 'Test User', email: 'test@example.com' },
];
const passwords: Record<string, string> = {
  'test@example.com': 'password123',
};

// Simulate JWT
const MOCK_JWT_SECRET = "your-super-secret-jwt-key"; // In a real app, this would be a strong, environment-managed secret

function generateToken(user: User): string {
  // Simplified token generation for mock purposes
  const payload = { sub: user.id, email: user.email, name: user.name, exp: Date.now() + 3600 * 1000 }; // Expires in 1 hour
  return `mock-jwt-header.${btoa(JSON.stringify(payload))}.mock-signature`;
}

function verifyToken(token: string): User | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp < Date.now()) {
      console.warn("Mock token expired");
      return null;
    }
    return { id: payload.sub, email: payload.email, name: payload.name };
  } catch (error) {
    console.error("Mock token verification failed:", error);
    return null;
  }
}


export async function loginUser(credentials: LoginFormValues): Promise<{ user: User; token: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.email === credentials.email);
      if (user && passwords[user.email] === credentials.password) {
        const token = generateToken(user);
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', token);
        }
        resolve({ user, token });
      } else {
        reject(new Error('Invalid email or password.'));
      }
    }, 1000);
  });
}

export async function registerUser(details: RegisterFormValues): Promise<{ user: User; token: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users.some(u => u.email === details.email)) {
        reject(new Error('User with this email already exists.'));
        return;
      }
      const newUser: User = {
        id: String(users.length + 1),
        name: details.name,
        email: details.email,
      };
      users.push(newUser);
      passwords[newUser.email] = details.password;
      const token = generateToken(newUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
      }
      resolve({ user: newUser, token });
    }, 1000);
  });
}

export async function logoutUser(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
      resolve();
    }, 500);
  });
}

export function getAuthenticatedUserFromToken(): { user: User | null; token: string | null } {
  if (typeof window === 'undefined') {
    return { user: null, token: null };
  }
  const token = localStorage.getItem('authToken');
  if (token) {
    const user = verifyToken(token);
    if (user) {
      return { user, token };
    } else {
      localStorage.removeItem('authToken'); // Clear invalid/expired token
      return { user: null, token: null };
    }
  }
  return { user: null, token: null };
}
