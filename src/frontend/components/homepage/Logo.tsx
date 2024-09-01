import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  const logoStyle: React.CSSProperties = {
    position: 'absolute',
    left: '20px',
    top: '0',
  };

  return (
    <Link href="/">
      <Image src="/logo.svg" alt="Logo" width={100} height={100} style={{
          position: 'absolute',
          left: '20px',
          top: '0',
          maxWidth: '400px',
          maxHeight: '400px',
        }}/>
    </Link>

    // components/Logo.js

  );
}
