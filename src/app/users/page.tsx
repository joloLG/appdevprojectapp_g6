'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type User = {
  id: number;
  name: string;
  username: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Explore Users</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <Link key={user.id} href={`/users/${user.id}`}>
            <div className="p-6 rounded-xl bg-white shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 cursor-pointer group">
              <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                {user.name}
              </p>
              <p className="text-sm text-gray-500 group-hover:text-blue-400">@{user.username}</p>
              <div className="mt-4 w-full h-1 bg-blue-100 group-hover:bg-blue-500 transition-all duration-300 rounded-full" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}



