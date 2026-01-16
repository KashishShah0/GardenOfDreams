import { usePOS } from '../context/POSContext';
import Sidebar from './Sidebar';

import { useEffect } from 'react';
import { io } from 'socket.io-client';

const Layout = ({ children }) => {
    useEffect(() => {
        const socket = io('http://localhost:5000');

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('new_order', (data) => {
            console.log('New order received:', data);

            const showNotification = () => {
                new Notification('New Order Received!', {
                    body: `Table: ${data.order.table || 'N/A'} - Total: ₹${data.order.total}`,
                });
            };

            if (Notification.permission === 'granted') {
                showNotification();
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        showNotification();
                    }
                });
            }
        });

        // Request permission on mount if not already granted/denied
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }

        return () => {
            socket.disconnect();
        };
    }, []);

    // The legacy layout used .app-layout grid.
    return (
        <div className="app-layout">
            <Sidebar />
            {children}
        </div>
    );
};

export default Layout;
