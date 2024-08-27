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
          left: '300px',
          top: '-10px',
          width:'150px',
          height:'100px',
          maxWidth: '600px',
          maxHeight: '600px',
        }}/>
    </Link>

    // components/Logo.js

  );
}
