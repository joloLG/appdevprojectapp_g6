'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('../../../components/LeafletMap'), { ssr: false });

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

export default function UserProfile() {
  const params = useParams();
  const userId = params?.id;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  if (!user) return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-md text-blue-600 font-medium">@{user.username}</p>
      </div>

      <div className="grid gap-4 mb-6 text-sm text-gray-700">
        <p><span className="font-medium text-gray-800">Email:</span> {user.email}</p>
        <p><span className="font-medium text-gray-800">Phone:</span> {user.phone}</p>
        <p><span className="font-medium text-gray-800">Website:</span> <a className="text-blue-600 underline" href={`https://${user.website}`} target="_blank">{user.website}</a></p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Address</h2>
        <div className="text-sm text-gray-700 leading-relaxed">
          <p>{user.address.street}, {user.address.suite}</p>
          <p>{user.address.city}, {user.address.zipcode}</p>
        </div>
      </div>

      <div className="w-full h-96 mt-6 rounded-lg overflow-hidden border border-gray-300">
        <LeafletMap
          lat={parseFloat(user.address.geo.lat)}
          lng={parseFloat(user.address.geo.lng)}
        />
      </div>
    </div>
  );
}
