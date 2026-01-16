import React, { useState } from 'react';
import '../assets/styles/style.css'; // Ensure we have the styles

const Login = ({ onLogin, title, password }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input === password) {
            onLogin();
        } else {
            setError(true);
            setInput('');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'hsl(var(--color-bg-main))',
            zIndex: 9999,
        }}>
            <div style={{
                background: 'hsl(var(--color-bg-sidebar))',
                padding: '3rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 0 40px rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}>
                <div className="brand-text">
                    <h1>Garden Of Dreams</h1>
                    <p style={{ marginTop: '0.5rem' }}>{title}</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="password"
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                setError(false);
                            }}
                            placeholder="Enter Password"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                border: error ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'hsl(var(--color-text-main))',
                                fontSize: '1.2rem',
                                outline: 'none',
                                textAlign: 'center'
                            }}
                            autoFocus
                        />
                        {error && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>Incorrect Password</span>}
                    </div>

                    <button type="submit" style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: 'hsl(var(--color-accent))',
                        color: 'hsl(var(--color-bg-sidebar))',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        boxShadow: '0 0 15px rgba(221, 170, 68, 0.3)'
                    }}>
                        Unlock Access
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
