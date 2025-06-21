import { createContext, useContext } from "react";
import { getCurrentUser } from './appwrite';
import { useAppwrite } from "./useAppwrite";

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
};

interface GlobalContextType {
    isLoggedIn: Boolean;
    user: User | null;
    loading: boolean;
    refetch: () => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
    children: React.ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    // here the goal is to wrap the screens not to render them 
    const {
        data: user,
        loading,
        refetch
    } = useAppwrite({
        fn: getCurrentUser,
    });

    // here the double exclamation mark is used to convert the user object to a boolean 
    // if user is null, it will be false, otherwise it will be true
    // for example !null=> true => false
    // if !{haseeb} => false => true 

    const isLoggedIn = !!user;

    console.log(JSON.stringify(user, null, 2));

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user,
            loading,
            refetch
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }

    return context;
}

export default GlobalProvider;