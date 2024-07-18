"use client";

import Link from 'next/link';
import Logo from './Logo';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hook/AuthContext';
import { Button } from '@mui/material';

export default function Header() {
    const { username, isLoggedIn, logout } = useAuth();
    const router = useRouter();

    const handleSignIn = () => {
        router.push('/login');
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const headerStyle: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'transparent'
    };

    const navContainerStyle: React.CSSProperties = {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
    };
    
    const navStyle: React.CSSProperties = {
        display: 'flex',
        gap: '20px'
    };

    const navLinkStyle: React.CSSProperties = {
        textDecoration: 'none',
        color: 'black',
        fontWeight: 'bold'
    };

    const iconsStyle: React.CSSProperties = {
        display: 'flex',
        gap: '10px'
    };

    const iconButtonStyle: React.CSSProperties = {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer'
    };

    return (
        <header style={headerStyle}>
            <Logo />
            <div style={navContainerStyle}>
                <div style={navStyle}>
                    <Link href="#" style={navLinkStyle}>Vehicles</Link>
                    <Link href="#" style={navLinkStyle}>Energy</Link>
                    <Link href="/rent" style={navLinkStyle}>Rent</Link>
                    <Link href="/browser" style={navLinkStyle}>Discover</Link>
                    <Link href="#" style={navLinkStyle}>Shop</Link>
                </div>
            </div>
            <div style={iconsStyle}>
                <button style={iconButtonStyle}>🌍</button>
                <button style={iconButtonStyle}>❔</button>
                {isLoggedIn ? (
                    <>
                        <p>Welcome, {username}!</p>
                        <Button style={iconButtonStyle} onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <Button style={iconButtonStyle} onClick={handleSignIn}>👤</Button>
                )}
            </div>
        </header>
    );
}
