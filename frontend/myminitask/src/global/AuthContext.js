import React, { createContext, useState } from 'react'
export const Auth = createContext();
export default function AuthContext({children}) {
    const [userAuth, setUserAuth] = useState(JSON.parse(localStorage.getItem("user"))?? "");
    const loginUser = (user) => {
        setUserAuth(user);
        localStorage.setItem("user", JSON.stringify(user));
    }
    const logoutUser = () => {
        setUserAuth({});
        localStorage.removeItem("user");
    }
    const value = {
        userAuth,
        setUserAuth,
        loginUser,
        logoutUser
    }
  return (
    <Auth.Provider value={value}>
        {children}
    </Auth.Provider>
  )
}
