import mongoose from 'mongoose';

export interface ITransaction extends mongoose.Document {
  customerId: string;
  invoiceId: string;
}
