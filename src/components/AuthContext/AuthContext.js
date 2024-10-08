import { createContext, useState, useEffect } from 'react';
import config from '../../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const getToken = () => {
        const url = new URLSearchParams(window.location.hash.substring(1));
        const token = url.get('access_token');
        if (token) {
            localStorage.setItem('token', token);
        }
        return localStorage.getItem('token');
    };

    const getUserInfo = async (token) => {
        try {
            const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching user info:', error);
            throw error;
        }
    };

    const login = () => {
        window.location.href = config.apikey.GET_LINK_TOKEN;
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCurrentUser(null);
        window.history.replaceState(null, null, '/');
        window.location.reload();
    };

    useEffect(() => {
        const token = getToken();
        if (token && !currentUser) {
            getUserInfo(token)
                .then((data) => {
                    if (data && data.sub) {
                        // Kiểm tra nếu thông tin người dùng hợp lệ
                        setCurrentUser(data);
                        localStorage.setItem('user', JSON.stringify(data));
                    } else {
                        console.error('Invalid user data');
                        logout(); // Đăng xuất nếu thông tin không hợp lệ
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch user info:', error);
                    logout(); // Đăng xuất nếu có lỗi xảy ra
                });
        }
    }, [currentUser]);

    return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
