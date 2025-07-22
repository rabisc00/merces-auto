import { createContext, useState, useContext, ReactNode } from "react";
import LoadingOverlay from "../components/LoadingOverlay";

type LoadingContextType = {
    isLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {children}
            {isLoading && <LoadingOverlay />}
        </LoadingContext.Provider>
    )
};

export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (!context) throw new Error('useLoading must be used within a Loading Provider');
    
    return context;
}