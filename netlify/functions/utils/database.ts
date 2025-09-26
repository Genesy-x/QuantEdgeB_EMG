// Simple JSON database for now - easily migrable to Supabase later
import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  verified: boolean;
  whopVerified: boolean;
  tier: 'free' | 'premium';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

const DB_PATH = '/tmp/quantedgeb_users.json';

// Initialize database
const initDB = async () => {
  try {
    await readFile(DB_PATH);
  } catch {
    // File doesn't exist, create it
    await writeFile(DB_PATH, JSON.stringify({ users: [], sessions: [] }));
  }
};

const readDB = async () => {
  await initDB();
  const data = await readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
};

const writeDB = async (data: any) => {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2));
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const db = await readDB();
  const user: User = {
    id: uuidv4(),
    ...userData
  };
  
  db.users.push(user);
  await writeDB(db);
  
  // Remove password from returned user
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword as User;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const db = await readDB();
  const user = db.users.find((u: User) => u.email === email);
  return user || null;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const db = await readDB();
  const user = db.users.find((u: User) => u.id === id);
  if (user) {
    // Remove password from returned user
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
  return null;
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<User | null> => {
  const db = await readDB();
  const userIndex = db.users.findIndex((u: User) => u.id === id);
  
  if (userIndex === -1) return null;
  
  db.users[userIndex] = { ...db.users[userIndex], ...updates };
  await writeDB(db);
  
  // Remove password from returned user
  const { password, ...userWithoutPassword } = db.users[userIndex];
  return userWithoutPassword as User;
};

export const verifyUser = async (id: string): Promise<User | null> => {
  return updateUser(id, { verified: true });
};

export const setWhopVerified = async (id: string, verified: boolean = true): Promise<User | null> => {
  const updates: Partial<User> = { 
    whopVerified: verified,
    tier: verified ? 'premium' : 'free'
  };
  return updateUser(id, updates);
};

// Session management
export const createSession = async (userId: string, token: string): Promise<void> => {
  const db = await readDB();
  db.sessions.push({
    userId,
    token,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
  });
  await writeDB(db);
};

export const getSession = async (token: string): Promise<any | null> => {
  const db = await readDB();
  const session = db.sessions.find((s: any) => s.token === token);
  
  if (session && new Date(session.expiresAt) > new Date()) {
    return session;
  }
  
  return null;
};

export const deleteSession = async (token: string): Promise<void> => {
  const db = await readDB();
  db.sessions = db.sessions.filter((s: any) => s.token !== token);
  await writeDB(db);
};