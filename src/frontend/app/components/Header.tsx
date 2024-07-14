"use client";

import Link from 'next/link';
import Logo from './Logo';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();

    const handleSignIn = () => {
      router.push('/login');
    };

    const headerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'transparent'
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
        <div style={navStyle}>
            <Link href="#" style={navLinkStyle}>Vehicles</Link>
            <Link href="#" style={navLinkStyle}>Energy</Link>
            <Link href="#" style={navLinkStyle}>Charging</Link>
            <Link href="#" style={navLinkStyle}>Discover</Link>
            <Link href="#" style={navLinkStyle}>Shop</Link>
        </div>
        <div style={iconsStyle}>
            <button style={iconButtonStyle}>🌐</button>
            <button style={iconButtonStyle}>❓</button>
            <button style={iconButtonStyle} onClick={handleSignIn}>👤</button>
        </div>
    </header>
    );
}
