import { createContext, useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';


interface AuthContextType {
    user: any;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const cookies = new Cookies();

    useEffect(() => {
        const user = cookies.get('user');

        if (user) {
            setUser(user);

            if (window.location.pathname === '/login') {
                window.location.href = '/';
            }
        }

        setLoading(false);
    }, []);

    const signIn = async (email: string, password: string) => {
        const response = await fetch('https://web-back-end-five.vercel.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if (data.access_token) {
            setUser(data.access_token);
            cookies.set('user', data.access_token);
        }

        return data;
    };

    const signOut = () => {
        setUser(null);
        cookies.remove('user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
