'use client'

import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/AuthContext';
import { Button } from '@mui/material';
import Image from 'next/image';

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
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        setClientOnly(true);
    }, []);

    const handleSignIn = () => {
        router.push('/login');
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
    };

    const headerStyle: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start', // 修改为 flex-start
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
        gap: '10px',
        position: 'relative',
        marginLeft: '1900px' 
    };

    const iconButtonStyle: React.CSSProperties = {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        marginLeft:'30px',
        marginRight:'30px'
    };

    const avatarStyle: React.CSSProperties = {
        borderRadius: '50%',
        cursor: 'pointer'
    };

    const dropdownStyle: React.CSSProperties = {
        display: dropdownVisible ? 'block' : 'none',
        position: 'absolute',
        right: 0,
        top: '160%',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        zIndex: 1000,
        minWidth: '250px'
    };

    const dropdownItemStyle: React.CSSProperties = {
        padding: '10px 20px',
        cursor: 'pointer',
        borderBottom: '1px solid #f0f0f0',
        textDecoration: 'none',
        color: 'black',
        display: 'flex', // 使用 flex 布局
        alignItems: 'center', // 垂直居中对齐
        gap: '10px' // 图标和文字之间的间距
    };

    return (
        <header style={headerStyle}>
            <Logo />

            <div style={iconsStyle}>
                {!isLoggedIn && pathname !== '/login' && clientOnly && ( // 只在未登录时显示登录按钮
                    <button style={iconButtonStyle} onClick={handleSignIn}>Login</button>
                )}
                    <div style={iconButtonStyle} onClick={toggleDropdown}>
                        <Image
                            src={avatar || '/default-avatar.png'}
                            alt="Avatar"
                            width={30}
                            height={30}
                            style={avatarStyle}
                        />
                    </div>
                    <div style={dropdownStyle}>
                        <div style={dropdownItemStyle}>
                            <span>👤</span>
                            <Button onClick={toggleDropdown} href="/profile" style={{ color: 'inherit', textDecoration: 'none' }}>aaa</Button>
                        </div>
                        <div style={dropdownItemStyle}>
                            <span>🔔</span>
                            <Button onClick={toggleDropdown} href="/notifications" style={{ color: 'inherit', textDecoration: 'none' }}>bbb</Button>
                        </div>
                        <div style={dropdownItemStyle}>
                            <span>🚗</span>
                            <Button onClick={toggleDropdown} href="/my-vehicles" style={{ color: 'inherit', textDecoration: 'none' }}>ccc</Button>
                        </div>
                        <div style={dropdownItemStyle}>
                            <span>📜</span>
                            <Button onClick={toggleDropdown} href="/rental-history" style={{ color: 'inherit', textDecoration: 'none' }}>ddd</Button>
                        </div>
                        <div style={dropdownItemStyle}>
                            <span>📦</span>
                            <Button onClick={toggleDropdown} href="/order-history" style={{ color: 'inherit', textDecoration: 'none' }}>eee</Button>
                        </div>
                        <div style={dropdownItemStyle}>
                            <span>❤️</span>
                            <Button onClick={toggleDropdown} href="/saved-vehicles" style={{ color: 'inherit', textDecoration: 'none' }}>fff</Button>
                        </div>
                        <div style={dropdownItemStyle}>
                            <span>📝</span>
                            <Button onClick={toggleDropdown} href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>ggg</Button>
                        </div>
                        <div style={dropdownItemStyle} onClick={handleLogout}>
                            <Image
                                src='/logout.svg'
                                alt="Logout"
                                width={20} // 设置图标宽度
                                height={20} // 设置图标高度
                                title="sign out"
                            />
                            <Button onClick={toggleDropdown} href="/" style={{ color: 'inherit', textDecoration: 'none' }}>sign out</Button>
                        </div>
                    </div>
                <button style={iconButtonStyle}>EN</button>
            </div>
        </header>
    );
}