"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDB"
import User from "@/models/User"
export const initiate = async (amount, to_username, paymentForm) => {
    await connectDB();
    let user = await User.findOne({ username: to_username });
        const secret = user.rzsecret;
    var instance = new Razorpay({
        key_id: user.rzid,
        key_secret: secret,
    })
    let options = {
        amount : Number.parseInt(amount),
        currency: "INR",
    }
    let x = await instance.orders.create(options)
    await Payment.create({
        name: paymentForm.name,  
        to_u:  to_username,
        oid: x.id,
        msg: paymentForm.msg, 
        amount: amount, 
        done: false,
    })

    return x;
}

export const fetchUser = async (username) => {
    await connectDB();
    let u = await User.findOne({ username: username });
    return JSON.parse(JSON.stringify(u));
}

export const fetchPayments = async (username) => {
    await connectDB();
    let p = await Payment.find({ to_u: username, done: true}).sort({ amount: -1 }).limit(10)
    return JSON.parse(JSON.stringify(p));
}
 
export const updateProfile = async (data, oldUsername) => {
    await connectDB();
    let ndata = Object.fromEntries(data)

    if(oldUsername !== ndata.username){
        let u = await User.findOne({ username: ndata.username });
        if(u){
            return { error: "Username already taken" }
        }
    }

    await User.updateOne({ username: oldUsername }, ndata) 
}