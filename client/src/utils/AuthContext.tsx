import React, {createContext, useState, useEffect, useContext} from "react";
import AuthService from "./AuthService";

interface AuthContextType {
    isLoggedin: boolean;
    login:(data: Object) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC <{children: React.ReactNode}> = ({children}) => {
    const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn  = await AuthService.checkLogin();
            setIsLoggedIn(loggedIn);
        };

        checkLoginStatus();
    }, []);

    const login = async (data: Object) => {
        const message = await AuthService.handleLogin(data);
        if(message === 'Login successful') {
            setIsLoggedIn(true);
        }
    };
    const logout = async () => {
        const message = await AuthService.handleLogout();
        if(message === "Logout successful"){
            setIsLoggedIn(false);
        }   
    };

    return (
        <AuthContext.Provider value ={{isLoggedin, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('UseAuth must be used within an Authprovider')
    }
    return context;
    
};