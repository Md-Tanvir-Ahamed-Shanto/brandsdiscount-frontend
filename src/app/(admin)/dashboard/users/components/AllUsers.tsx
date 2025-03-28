'use client'
import { useGetAllUsersQuery } from '@/api';
import Image from 'next/image';
import React from 'react'

const AllUsers = () => {
    const { data: userData, isLoading, isError, error } = useGetAllUsersQuery('');
    console.log("🚀 ~ AllUsers ~ userData:", userData)
    const users = dummyUsers; // Use dummy users directly
return (
    {users.map((user) => (
        <tr key={user.id} className='border-b'>
            <td>
                <div className='flex items-center gap-2 p-3'>
                    <Image
                        src={user.img || '/astronaut.png'}
                        alt=''
                        width={40}
                        height={40}
                        className='rounded-full object-cover'
                    />
                    {user.username}
                </div>
            </td>
            <td className='p-3'>{user.email}</td>
            <td className='p-3'>
                {new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td className='p-3'>
                {user.isAdmin ? 'Admin' : 'Client'}
            </td>
            <td className='p-3'>
                {user.isActive ? 'Active' : 'Inactive'}
            </td>
            <td className='p-3 flex gap-2'>
                <div className='flex gap-2'>
                    <Link href={`/dashboard/users/${user.id}`}>
                        <button className='py-1 px-3 bg-teal-500 text-white rounded'>
                            View
                        </button>
                    </Link>
                    <form action=''>
                        <input
                            type='hidden'
                            name='id'
                            value={user.id}
                        />
                        <button className='px-3 py-1 bg-red-500 text-white rounded'>
                            Delete
                        </button>
                    </form>
                </div>
            </td>
        </tr>
    ))}
  )
}

export default AllUsers