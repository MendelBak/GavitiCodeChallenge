import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { ITransaction } from '../interfaces/ITransaction';

const TransactionSchema = new Schema(
  {
    customerId: { type: String, required: true },
    invoiceId: { type: String, required: true },
  },
  { timestamps: true, minimize: false }
);

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
