'use client'

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { useRouter } from 'next/navigation';
import { useAuth } from '../authwarn/AuthContext';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface AuthContext {
    username: string;
    isLoggedIn: boolean;
    logout: () => void;
    avatar?: string;
}
  
export default function Header() {
    const { username, isLoggedIn, logout, avatar } = useAuth() as AuthContext;
    const router = useRouter();
    const [clientOnly, setClientOnly] = useState(false);

    useEffect(() => {
        setClientOnly(true);
    }, []);

    const handleSignIn = () => {
        router.push('/user/login');
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
        alignItems: 'center',
        gap: '10px'
    };

    const iconButtonStyle: React.CSSProperties = {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer'
    };

    const avatarStyle: React.CSSProperties = {
        borderRadius: '50%',
        marginRight: '10px'
    };

    return (
        <header style={headerStyle}>
            <Logo />
            <div style={navContainerStyle}>
                <div style={navStyle}>
                    <Link href="#" style={navLinkStyle}>Vehicles</Link>
                    <Link href="#" style={navLinkStyle}>Energy</Link>
                    <Link href="/service/rent" style={navLinkStyle}>Rent</Link>
                    <Link href="/browser" style={navLinkStyle}>Discover</Link>
                    <Link href="#" style={navLinkStyle}>Shop</Link>
                </div>
            </div>
            <div style={iconsStyle}>
                <button style={iconButtonStyle}>🌍</button>
                <button style={iconButtonStyle}>❔</button>
                {clientOnly && isLoggedIn ? (
                    <>
                        <Link style={navLinkStyle} href="/user/profile">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Image
                                    src={avatar || '/default-avatar.png'} // 使用默认头像
                                    alt="Avatar"
                                    width={30} // 设置头像宽度
                                    height={30} // 设置头像高度
                                    style={avatarStyle}
                                />
                                <div>Welcome, {username}!</div>
                            </div>
                        </Link>
                        <Button style={iconButtonStyle} onClick={handleLogout}>
                            <Image
                                src='/logout.svg'
                                alt="Logout"
                                width={20} // 设置图标宽度
                                height={20} // 设置图标高度
                                title="sign out"
                            />
                        </Button>
                    </>
                ) : (
                    clientOnly && <Button style={iconButtonStyle} onClick={handleSignIn}>
                        <Image
                            src='login.svg'
                            alt="Login"
                            width={20} // 设置图标宽度
                            height={20} // 设置图标高度
                            title="sign in"
                        />
                    </Button>
                )}
            </div>
        </header>
    );
}