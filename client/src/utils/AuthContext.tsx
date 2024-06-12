import React, {createContext, useState, useEffect, useContext} from "react";
import AuthService from "./AuthService";

interface AuthContextType {
    isLoggedin: boolean;
    login:(data: Object) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({children}) => {
    const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const checkLoginStatus = async () = {
            const loggedIn = await AuthService.checkLogin();
            setIsLoggedIn(loggedIn);
        };

        checkLoginStatus();
    }, []);

    const login = async (data: Object) => {


    }
}