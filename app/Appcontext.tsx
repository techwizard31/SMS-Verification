"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the user object structure
interface User {
  _id: string;
  email: string;
}

// Define the context type
interface AppContextType {
  user: User | null;
  setUser: (user: User) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easy usage
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
