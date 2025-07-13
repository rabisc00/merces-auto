import { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
    userToken: string | null;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const login = (token: string) => setUserToken(token);
    const logout = () => setUserToken(null);

    return (
        <AuthContext.Provider value={{ userToken, isAdmin, setIsAdmin, login, logout }} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    
    return context;
};