import { createContext, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from '../utils/api';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
    
    let loginUser = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`${API_BASE_URL}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
            });

            if (response.status === 200) {
                let data = await response.json();
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                return true;
            } else {
                let errorMessage = 'Invalid credentials!';
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        let errorData = await response.json();
                        if (errorData.detail) {
                            errorMessage = errorData.detail;
                        }
                    }
                } catch (parseError) {
                    console.error("Failed to parse login error JSON:", parseError);
                }
                alert(errorMessage);
                return false;
            }
        } catch (error) {
            console.error("Login connection error:", error);
            alert('Unable to connect to the server. Please try again.');
            return false;
        }
    };

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    };

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
