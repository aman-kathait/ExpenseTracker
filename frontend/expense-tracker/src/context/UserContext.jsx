import React, { createContext, useState, useEffect } from 'react';
export const UserContext=createContext();
const UserProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading, setLoading] = useState(true);

    // Initialize user from localStorage when app starts
    useEffect(() => {
        console.log('UserContext: Initializing from localStorage...');
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        console.log('UserContext: Found token:', !!token);
        console.log('UserContext: Found userData:', !!userData);
        
        if (token && userData) {
            try {
                const parsedUserData = JSON.parse(userData);
                setUser(parsedUserData);
                console.log('UserContext: User restored from localStorage:', parsedUserData);
            } catch (error) {
                console.error("UserContext: Error parsing user data from localStorage:", error);
                // Clear invalid data
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        } else {
            console.log('UserContext: No valid authentication found in localStorage');
        }
        setLoading(false);
        console.log('UserContext: Loading complete');
    }, []);

    const updateUser=(userData)=>{
        setUser(userData);
        // Store user data in localStorage when updating
        if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
            console.log('User data stored to localStorage:', userData);
        }
    };

    const clearUser=()=>{
        setUser(null);
        // Clear both user data and token from localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        console.log('User data cleared from localStorage');
    }
    return(
        <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;