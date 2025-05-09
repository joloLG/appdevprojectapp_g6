'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();

    window.addEventListener('userChanged', checkUser);

    return () => {
      window.removeEventListener('userChanged', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userChanged')); // Notify header of logout
    setMenuOpen(false);
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md shadow-md z-10">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Hamburger Icon (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex w-full justify-between items-center">
          {/* Left - Login/Register */}
          <div className="flex space-x-4">
            {!user && (
              <>
                <Link href="/login" className="text-gray-800 hover:text-blue-600">Login</Link>
                <Link href="/register" className="text-gray-800 hover:text-blue-600">Register</Link>
              </>
            )}
          </div>

          {/* Center - Navigation */}
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-800 hover:text-blue-600">Home</Link>
            <Link href="/dashboard" className="text-gray-800 hover:text-blue-600">Dashboard</Link>
            <Link href="/posts" className="text-gray-800 hover:text-blue-600">Posts</Link>
            <Link href="/users" className="text-gray-800 hover:text-blue-600">Users</Link>
          </div>

          {/* Right - Logout */}
          <div>
            {user && (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white px-6 pt-0 pb-4 shadow-md transform transition-all duration-300 ease-in-out origin-top ${menuOpen ? 'max-h-screen scale-y-100 opacity-100' : 'max-h-0 scale-y-0 opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col space-y-2">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600">Home</Link>
          <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600">Dashboard</Link>
          <Link href="/posts" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600">Posts</Link>
          <Link href="/users" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600">Users</Link>
          {!user && (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600">Login</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-blue-600">Register</Link>
            </>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium text-left"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
