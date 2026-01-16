import { usePOS } from '../context/POSContext';
import Sidebar from './Sidebar';

import { useEffect } from 'react';
import { io } from 'socket.io-client';

const Layout = ({ children }) => {
    useEffect(() => {
        // Determine Socket URL from API URL or default to localhost
        const getSocketUrl = () => {
            const apiUrl = import.meta.env.VITE_API_URL;
            if (apiUrl) {
                try {
                    return new URL(apiUrl).origin;
                } catch (e) {
                    console.error('Invalid VITE_API_URL for socket:', e);
                }
            }
            return 'http://localhost:5000';
        };

        const socket = io(getSocketUrl());

        socket.on('connect', () => {
            console.log('Connected to socket server:', getSocketUrl());
        });

        socket.on('new_order', (data) => {
            console.log('New order received:', data);

            const showNotification = () => {
                // Check if Notification API is supported
                if (!('Notification' in window)) return;

                new Notification('New Order Received!', {
                    body: `Table: ${data.order.table || 'N/A'} - Total: ₹${data.order.total}`,
                });
            };

            // Safe permission check
            if ('Notification' in window) {
                if (Notification.permission === 'granted') {
                    showNotification();
                } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            showNotification();
                        }
                    });
                }
            }
        });

        // Request permission on mount if not already granted/denied
        if ('Notification' in window && Notification.permission === 'default') {
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
