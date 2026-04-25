import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDB from "@/db/connectDB";
import crypto from "crypto";

export async function POST(req) {
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body);

    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
        return NextResponse.json({ success: false, message: "Order ID not found" }, { status: 404 });
    }

    let user = await User.findOne({ username: p.to_u });
    const secret = user.rzsecret; 

    const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(body.razorpay_order_id + "|" + body.razorpay_payment_id)
        .digest("hex");

    if (generated_signature === body.razorpay_signature) {
        // SAVING THE PAYMENT ID HERE
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { 
              done: true, 
              payment_id: body.razorpay_payment_id // <--- THIS SAVES THE ID NOW
            },
            { new: true }
        );
        
        // Use p.to_u to avoid the 'undefined' redirect issue
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${p.to_u}?paymentdone=true`, { status: 303 });
    } else {
        return NextResponse.json({ success: false, message: "Payment Verification Failed" }, { status: 400 });
    }
}