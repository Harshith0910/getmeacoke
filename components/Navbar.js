"use client";
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession()
  const router = useRouter();
  return (
    <nav className='bg-gray-950 text-white p-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0'>
      <div className='text-2xl font-bold flex items-center justify-center'> <img width={47} src="/assets/coke.gif" alt="" />
        <button onClick={() => { router.push('/') }} className="cursor-pointer ms-2">
          GetMeACoke!
        </button>
      </div>
      <div className='flex flex-col sm:flex-row items-center gap-2'>
        {session && <Link href={`/${session.user.username}`}>
          <button className="text-gray-900 bg-linear-to-r from-teal-400 to-lime-200 hover:bg-linear-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer">Your Page</button>
        </Link>}
        {session && <Link href={"/dashboard"}>
          <button className="text-gray-900 bg-linear-to-r from-teal-400 to-lime-200 hover:bg-linear-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer">Dashboard</button>
        </Link>}
        {session && <button className="text-gray-900 bg-linear-to-r from-teal-400 to-lime-200 hover:bg-linear-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer" onClick={() => { signOut({ callbackUrl: '/login' }) }}>Log Out</button>
        }
        {!session &&
          <Link href={"/login"}>
            <button className="text-gray-900 bg-linear-to-r from-teal-400 to-lime-200 hover:bg-linear-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2 text-center cursor-pointer">Login</button>
          </Link>
        }
      </div>
    </nav>
  )
}

export default Navbar
