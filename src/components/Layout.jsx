import { usePOS } from '../context/POSContext';
import Sidebar from './Sidebar';

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';

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

            // Play notification sound
            const playNotificationSound = () => {
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                audio.play().catch(e => console.error('Audio play failed:', e));
            };
            playNotificationSound();

            // 1. Show In-App Toast (Guaranteed to work if app is open)
            toast.success(`New Order: Table ${data.order.table || 'N/A'} - ₹${data.order.total}`, {
                duration: 5000,
                position: 'top-right',
                style: {
                    background: '#1a1a1a', // Dark theme matching likely
                    color: '#fff',
                    border: '1px solid #333',
                },
            });

            // 2. Try System Notification
            const showSystemNotification = () => {
                if (!('Notification' in window)) return;

                try {
                    new Notification('New Order Received!', {
                        body: `Table: ${data.order.table || 'N/A'} - Total: ₹${data.order.total}`,
                        icon: '/vite.svg' // Optional: Add an icon path if available
                    });
                } catch (e) {
                    console.error('Notification failed:', e);
                }
            };

            if ('Notification' in window) {
                if (Notification.permission === 'granted') {
                    showSystemNotification();
                } else if (Notification.permission !== 'denied') {
                    Notification.requestPermission().then(permission => {
                        if (permission === 'granted') {
                            showSystemNotification();
                        }
                    });
                }
            }
        });

        socket.on('item_ready', (data) => {
            console.log('Item ready received:', data);

            // Play notification sound
            const playNotificationSound = () => {
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
                audio.play().catch(e => console.error('Audio play failed:', e));
            };
            playNotificationSound();

            // 1. Show In-App Toast
            toast.success(`Item Ready: ${data.item.name} (Table ${data.table || 'N/A'})`, {
                duration: 5000,
                position: 'top-right',
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid #333',
                },
                icon: '🍽️',
            });

            // 2. Try System Notification
            const showSystemNotification = () => {
                if (!('Notification' in window)) return;

                try {
                    new Notification('Item Ready!', {
                        body: `${data.item.name} is ready for Table ${data.table || 'N/A'}`,
                        icon: '/vite.svg'
                    });
                } catch (e) {
                    console.error('Notification failed:', e);
                }
            };

            if ('Notification' in window && Notification.permission === 'granted') {
                showSystemNotification();
            }
        });

        // Request permission on mount logic for Mobile
        // Browsers block requestPermission() effectively unless triggered by user interaction.
        // We show a toast that allows the user to click to enable notifications.
        if ('Notification' in window && Notification.permission === 'default') {
            toast((t) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>Enable notifications for new orders?</span>
                    <button
                        onClick={() => {
                            Notification.requestPermission();
                            toast.dismiss(t.id);
                        }}
                        style={{
                            padding: '4px 8px',
                            background: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Enable
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        style={{
                            padding: '4px 8px',
                            background: '#666',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Later
                    </button>
                </div>
            ), {
                duration: 10000, // Stay longer
                position: 'bottom-center'
            });
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
            <Toaster />
        </div>
    );
};

export default Layout;
