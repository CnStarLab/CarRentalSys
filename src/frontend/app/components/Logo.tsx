"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  const logoStyle: React.CSSProperties = {
    position: 'absolute',
    left: '20px', // 根据布局需要调整位置
    top: '0',
  };

  return (
    <Link href="/">
      <Image src="/logo.png" alt="Logo" width={100} height={100} style={logoStyle}/>
    </Link>
  );
}
