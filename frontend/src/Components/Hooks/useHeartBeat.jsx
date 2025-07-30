import { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../Contexts/Auth/AuthContext";
import SetContext from "../Contexts/SetContexts/SetContext";
import { useNavigate } from "react-router-dom";

export function useHeartBeat(interval = 15 * 60 * 1000) {
    const [authStatues, setAuthStatues] = useState('idle');
    const { setAuth, setToken } = useContext(AuthContext);
    const { axiosInstance } = useContext(SetContext);
    const timerRef = useRef(null);
    const navigate = useNavigate();

    const refresh = async () => {
        try {
            setAuthStatues('loading');
            const response = await axiosInstance.post('/refresh-token', { message: 'refresh_token' });
            if (response.status >399) {
                setAuthStatues('error');
                navigate('/login');
                throw new Error(response.data.message || 'Token жаңалау қате!');
            }
            setToken(response.headers.authorization.split(' ')[1]);
            setAuth(response.data.user);
            setAuthStatues('success');
            console.log('Token жаңалау сәтті болды!');
            // if(window.location.pathname === '/login'){
            //     navigate('/');
            // }
            // if(window.location.pathname === '/register'){
            //     navigate('/');
            // }
        } catch (error) {
            console.log(error);
            setAuthStatues('error');
        }
    };
    useEffect(() => {
        refresh();
        timerRef.current = setInterval(() => {
            refresh();
        }, interval);
        return () => {
            clearInterval(timerRef.current);
        }
    }, []);

    return authStatues;
}
