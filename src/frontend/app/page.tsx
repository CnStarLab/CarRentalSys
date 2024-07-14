'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from './components/Header';

export default function HomePage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <div>
      <Header/>
      <div>
        <h1>Home Page</h1>
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}
