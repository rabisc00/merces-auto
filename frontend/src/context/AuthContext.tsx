import { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
    userToken: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);

    const login = (token: string) => setUserToken(token);
    const logout = () => setUserToken(null);

    return (
        <AuthContext.Provider value={{ userToken, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    console.log(AuthContext);
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    
    return context;
};