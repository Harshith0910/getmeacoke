"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { initiate, fetchUser, fetchPayments } from '@/actions/userActions'
import { useSearchParams, useRouter } from 'next/navigation'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentPage = ({ resParams }) => {

  const [paymentForm, setPaymentForm] = useState({ name: "", msg: "", amount: 0 });
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [pageLoading, setPageLoading] = useState(true); 
  
  const searchParams = useSearchParams();
  const router = useRouter(); 

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast.success('Payment Successful', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Slide,
      });
      // SCRUB THE URL: Replace current URL with clean version so refreshing doesn't re-trigger toast
      router.replace(`/${resParams}`);
    }
  }, [searchParams, router, resParams]);

  const handleChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  }

  const getData = async () => {
    setPageLoading(true); // Start skeleton loader
    let u = await fetchUser(resParams);
    setCurrentUser(u);
    let dbpayments = await fetchPayments(resParams);
    setPayments(dbpayments);
    setPageLoading(false); // Remove skeleton loader
  }

  const pay = async (amount) => {
    if (!amount || isNaN(amount) || amount < 100) {
      toast.error('Please enter a valid amount (Minimum ₹1)', { theme: "dark" });
      return; 
    }

    if (amount > 5000000) { 
      toast.error('Test Mode limit exceeded: Maximum allowed is ₹50,000', { theme: "dark" });
      return; 
    }

    setLoading(true); 
    try {
      let a = await initiate(amount, resParams, paymentForm)
      
      if (!a || !a.id) {
        toast.error('Server Error: Failed to generate order.', { theme: "dark" });
        setLoading(false);
        return;
      }

      let orderId = a.id;
      var options = {
        "key": currentUser.rzid,
        "amount": amount,
        "currency": "INR",
        "name": "GetMeACoke",
        "description": "Donation",
        "order_id": orderId,
        "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
        "prefill": {
          "name": "Arthur Morgan",
          "email": "westernboy@gmail.com",
          "contact": "9999999999"
        },
        "theme": {
          "color": "#3399cc"
        }
      }
      var rzp1 = new window.Razorpay(options);
      
      rzp1.on('payment.failed', function (response){
          toast.error(`Payment Failed: ${response.error.description}`, { theme: "dark" });
      });

      rzp1.open();
    } catch (error) {
      console.error(error);
      toast.error('Network error. Failed to initiate payment.', { theme: "dark" });
    } finally {
      setLoading(false); 
    }
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
        theme="light"
        transition={Slide}
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className='text-white min-h-screen pb-20'>
        
        <div className='cover w-full relative h-48 md:h-96'>
          <img className='object-cover w-full h-full'
            src={currentUser.cp ? currentUser.cp : "https://images5.alphacoders.com/114/1141405.jpg"}
            alt="Cover Picture" />
          
          <div className='absolute -bottom-14 left-1/2 -translate-x-1/2'>
            <img
              src={currentUser.pfp ? currentUser.pfp : "/assets/pfp.gif"}
              className='w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 border-gray-950 object-cover'
              alt="Profile Picture"
            />
          </div>
        </div>
        <div className="name flex gap-3 flex-col justify-center items-center mt-16 ">
          <div className='text-2xl font-bold'>
            @{resParams}
          </div>
          <div className='text-gray-400'>
            Help to raise funds for {resParams} !
          </div>
          
          {/* STATS SKELETON */}
          <div className='text-gray-300 h-6'>
            {pageLoading ? (
              <div className="w-48 h-4 bg-gray-800 rounded animate-pulse mt-1"></div>
            ) : (
              `${payments.length} Supporters • Raised ₹${payments.reduce((a, p) => a + p.amount, 0) / 100} so far!`
            )}
          </div>

          <div className="payments flex flex-col md:flex-row gap-6 w-full max-w-7xl mx-auto px-4 mt-4 mb-10">
            
            <div className="supporters bg-gray-900 p-5 rounded-lg w-full md:w-1/2">
              <h2 className='text-2xl font-bold my-3 mb-6'>Top Supporters</h2>
              
              {/* SUPPORTERS LIST SKELETON / LOADED STATE */}
              {pageLoading ? (
                <div className="space-y-5 mx-4 max-h-77 overflow-hidden pr-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3 animate-pulse">
                      <div className="w-9 h-9 bg-gray-800 rounded-full shrink-0"></div>
                      <div className="h-4 bg-gray-800 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className='mx-4 text-lg max-h-77 overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                  {payments.length === 0 && <span className='text-gray-300'>No supporters yet. Be the first one to support!</span>}
                  {payments.map((p, i) => {
                    return (
                      <li key={i} className='my-4 flex items-center gap-3'>
                        <img
                          width={35}
                          className="rounded-full bg-gray-800 p-1"
                          src={`https://api.dicebear.com/9.x/rings/svg?seed=${p.name}`}
                          alt={p.name}
                        />
                        <span>{p.name} donated <span className='font-bold'>₹{p.amount / 100}</span> with a message "{p.msg}". </span>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            
            <div className="paying bg-gray-900 p-5 rounded-lg w-full md:w-1/2">
              <h2 className='text-2xl font-bold my-3 mb-6'>Make Payment</h2>
              <div className='flex flex-col gap-5 mx-3'>
                <input onChange={handleChange} value={paymentForm.name} name='name' className='p-2 rounded-lg bg-gray-800 text-white' type="name" placeholder='Enter Name' />
                <input onChange={handleChange} value={paymentForm.msg} name='msg' className='p-2 rounded-lg bg-gray-800 text-white' type="message" placeholder='Enter Message' />
                <input onChange={handleChange} value={paymentForm.amount} name='amount' className='p-2 rounded-lg bg-gray-800 text-white' type="number" placeholder='Enter Amount in ₹' />
                
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2'>
                  <button className=' bg-blue-950 hover:bg-blue-800 p-2 rounded-lg font-bold cursor-pointer transition-colors' onClick={() => pay(10000)}>₹100</button>
                  <button className='bg-blue-950 hover:bg-blue-800 p-2 rounded-lg font-bold cursor-pointer transition-colors' onClick={() => pay(25000)}>₹250</button>
                  <button className='bg-blue-950 hover:bg-blue-800 p-2 rounded-lg font-bold cursor-pointer transition-colors' onClick={() => pay(50000)}>₹500</button>
                  <button className='bg-blue-950 hover:bg-blue-800 p-2 rounded-lg font-bold cursor-pointer transition-colors' onClick={() => pay(100000)}>₹1000</button>
                </div>
                
                <button 
                  onClick={() => pay(Number.parseInt(paymentForm.amount) * 100)} 
                  disabled={loading}
                  className="text-black bg-linear-to-r from-teal-400 to-lime-200 hover:bg-linear-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 cursor-pointer transition-all" 
                > 
                  {loading ? 'Processing...' : 'Pay'}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentPage