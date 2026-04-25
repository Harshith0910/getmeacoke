import mongoose from "mongoose";

const {Schema, model } = mongoose;

const PaymentSchema = new Schema({
    name: { type: String},
    to_u: { type: String},
    payment_id: { type: String },
    oid: { type: String},
    msg: { type: String },
    amount: { type: Number },
    createdAt: { type: Date, default: Date.now },
    done: { type: Boolean, default: false }
});

export default  mongoose.models.Payment || model("Payment", PaymentSchema) ;