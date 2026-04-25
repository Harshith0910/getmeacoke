"use client";
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { fetchUser, updateProfile } from '@/actions/userActions';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const router = useRouter()
    const { data: session, update } = useSession()
    const [form, setform] = useState({})

    useEffect(() => {
        document.title = "Dashboard- GetMeACoke";
        if (!session) {
            router.push('/login');
        }
        else {
            getData();
        }
    }, [router, session]);

    const getData = async () => {
        let uD = await fetchUser(session.user.username);
        setform(uD);
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        let a = await updateProfile(e, session.user.username)
        toast.info('Profile updated!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
            <div className='text-white py-16 container mx-auto min-h-screen '>
                <h1 className='font-bold text-3xl text-center'>Welcome! Please fill in the details to continue</h1>
                <div className="details">
                    <form className='flex flex-col gap-3 mt-10 mb-11 w-1/2 mx-auto' action={handleSubmit}>

                        <span className='font-bold text-lg'>Full Name</span>
                        <input value={form.name ? form.name : ""} onChange={handleChange} id='name' name="name" className='p-3 rounded-lg bg-gray-800 border border-gray-700' type="text" placeholder='Full Name' />

                        <span className='font-bold text-lg'>Set Username</span>
                        <input value={form.username ? form.username : ""} onChange={handleChange} id='username' name="username" className='p-3 rounded-lg bg-gray-800 border border-gray-700' type="text" placeholder='Username' />

                        <span className='font-bold text-lg'>Set Email</span>
                        <input value={form.email ? form.email : ""} onChange={handleChange} id='email' name="email" className='p-3 rounded-lg bg-gray-800 border border-gray-700' type="email" placeholder='Email' />

                        <span className='font-bold text-lg'>Cover Picture URL</span>
                        <input value={form.cp ? form.cp : ""} onChange={handleChange} id='cp' name="cp" className='p-3 rounded-lg bg-gray-800 border border-gray-700' type="text" placeholder='Cover Picture URL' />

                        <span className='font-bold text-lg'>Profile Picture URL</span>
                        <input value={form.pfp ? form.pfp : ""} onChange={handleChange} id='pfp' name="pfp" className='p-3 rounded-lg bg-gray-800 border border-gray-700' type="text" placeholder='Profile Picture URL' />

                        <span className='font-bold text-lg'>Confirm Password</span>
                        <input value={form.password ? form.password : ""} onChange={handleChange} id='password' name="password" className='p-3 rounded-lg bg-gray-800 border border-gray-700' type="password" placeholder='Password' />

                        <span className='font-bold text-lg'>Razorpay Credentials</span>

                        <input value={form.rzid ? form.rzid : ""} onChange={handleChange} id='rzid' name="rzid" className='p-3 rounded-lg bg-gray-800 border border-gray-700' type="text" placeholder='Razorpay ID' />

                        <input value={form.rzsecret ? form.rzsecret : ""} onChange={handleChange} id='rzsecret' name="rzsecret" className='p-3 rounded-lg bg-gray-800 border border-gray-700' type="text" placeholder='Razorpay Secret' />


                        <button className="text-black bg-linear-to-r from-teal-400 to-lime-200 hover:bg-linear-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-100 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer mt-4"> Save Details </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Dashboard
