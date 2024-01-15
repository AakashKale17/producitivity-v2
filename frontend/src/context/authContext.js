import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const instance = axios.create({
    withCredentials: true
  })

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null )

    const login = async (inputs) => {
        const res = await instance.post("http://localhost:8800/backend/auth/login", inputs); 
        setCurrentUser(res.data);
    };

    const logout = async (inputs) => {
        await instance.post("http://localhost:8800/backend/auth/logout"); 
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value = {{ currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};