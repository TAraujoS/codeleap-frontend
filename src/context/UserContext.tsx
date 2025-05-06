import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type UserContextType = {
  username: string;
  setUsername: (name: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsernameState] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsernameState(stored);
  }, []);

  const setUsername = (name: string) => {
    localStorage.setItem("username", name);
    setUsernameState(name);
  };

  const logout = () => {
    localStorage.removeItem("username");
    setUsernameState("");
    toast.success("Logged out!");
  };

  return (
    <UserContext.Provider value={{ username, setUsername, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
