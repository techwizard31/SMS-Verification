"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

// Define the user object structure
interface User {
  _id: string;
  email: string;
}

// Define the context type
interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = Cookies.get("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  // Store user in cookies when setUser is called
  useEffect(() => {
    if (user) {
      Cookies.set("user", JSON.stringify(user), { expires: 1, path: "/" }); // Expires in 1 day
    } else {
      Cookies.remove("user");
    }
  }, [user]);

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
