import TransactionSchema from '../models/transaction.model';
import { ITransaction } from '../interfaces/ITransaction';
const mongoose = require('mongoose');
import generateCSVFile from './../services/ExcelUtil';
import ExcelUtil from './../services/ExcelUtil';

export default module.exports = {
  createTransaction: async (transaction: any) => {
    try {
      console.log('🚀 ~ createTransaction: ~ transaction', transaction);
      const newTransaction: ITransaction = new TransactionSchema({
        // TODO: These are obviously fake IDs. They would be replaced with real user data coming in via the post request body.
        customerId: 'testId',
        invoiceId: 'testInvoiceID',
        // customerId: transaction.customerId,
        // invoiceId: transaction.invoiceId,
      });

      await newTransaction.save();
      return newTransaction;
    } catch (err) {
      throw new Error(`Server Error, could not create new transaction: ${err}`);
    }
  },

  getTransaction: async (id: string) => {
    try {
      return await TransactionSchema.findOne({ _id: id });
    } catch (err) {
      throw new Error(
        `Server Error, could not return transation: ID = ${id} : ${err}`
      );
    }
  },

  getTransactionRange: async (startDate: Date, endDate: Date) => {
    try {
      const response = await TransactionSchema.find(
        {
          updatedAt: {
            $gte: startDate,
            $lte: endDate,
          },
        }
        // { updatedAt: 1 }
      );

      // ExcelUtil.generateCSVFile(response);

      return response;
    } catch (err) {
      throw new Error(
        `Server Error, could not return transaction range: ${err}`
      );
    }
  },

  getAllTransaction: async () => {
    try {
      return await TransactionSchema.find().exec();
    } catch (err) {
      throw new Error(
        `Server Error, could not return list of transactions: ${err}`
      );
    }
  },

  //  Updates transaction collection.
  updateTransaction: async (transaction: ITransaction) => {
    try {
      return await TransactionSchema.findOneAndUpdate(
        { _id: transaction._id },
        transaction,
        { new: true, upsert: true }
      );
    } catch (err) {
      throw new Error(`Server Error, could not update transaction: ${err}`);
    }
  },
};
