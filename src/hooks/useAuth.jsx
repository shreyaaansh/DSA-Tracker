import { useState, useContext, createContext } from 'react';
import * as UserService from '../Services/UserService';
import { toast } from 'react-toastify';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(UserService.getUser());
    const login = async (email, password) => {
        try {
            const User = await UserService.login(email, password);
            toast.success('Login Successfully');

            setUser(User);
            return true;
        }
        catch(err) {
            toast.error(err.response.data);
            return false;
        }
    };
    const Register = async (RegisterData) => {
        try {
            const User = await UserService.register(RegisterData);
            toast.success("Register Successfully");

            setUser(User);
            return true;


        }
        catch(err) {
            toast.error(err.response.data);
            return false;

        }
    }
    const logout = () => {
        UserService.logout();
        setUser(null);
        toast.success("Logout SuccessFully");
    }
    return (
        <AuthContext.Provider
            value={
                { user, setUser, login, Register, logout }
            }
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth =()=>useContext(AuthContext);