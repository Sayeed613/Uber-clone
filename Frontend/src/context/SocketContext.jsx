
import  { createContext, useEffect , useMemo} from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();


const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io(import.meta.env.VITE_BASE_URL), []);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;