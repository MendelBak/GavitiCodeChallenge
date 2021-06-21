import TransactionSchema from '../models/transaction.model';
import { ITransaction } from '../interfaces/ITransaction';
const mongoose = require('mongoose');
import generateCSVFile from './../services/ExcelUtil';
import ExcelUtil from './../services/ExcelUtil';

export default module.exports = {
  // Creates a new transaction record. Call it via GET request (to make it easier for the testers, there is no need to pass arguments in this coding challenge.)
  createTransaction: async (transaction: any) => {
    try {
      const newTransaction: ITransaction = new TransactionSchema({
        // TODO: These are obviously fake IDs. They would be replaced with real user data coming in via the post request body, as seen below.
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

  // Returns one transaction
  getTransaction: async (id: string) => {
    try {
      return await TransactionSchema.findOne({ _id: id });
    } catch (err) {
      throw new Error(
        `Server Error, could not return transation: ID = ${id} : ${err}`
      );
    }
  },

  // This route returns an array of transactions between two dates.
  getTransactionRange: async (startDate: Date, endDate: Date) => {
    try {
      const response = await TransactionSchema.find({
        updatedAt: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      // ExcelUtil.generateCSVFile(response);
      console.log('🚀 ~ getTransactionRange: ~ response', response);

      return response;
    } catch (err) {
      throw new Error(
        `Server Error, could not return transaction range: ${err}`
      );
    }
  },

  // Returns all transactions
  getAllTransaction: async () => {
    try {
      return await TransactionSchema.find().exec();
    } catch (err) {
      throw new Error(
        `Server Error, could not return list of transactions: ${err}`
      );
    }
  },

  //  Updates one transaction. Creates a new record, if not found.
  // This method is untested, but should work.
  // updateTransaction: async (transaction: ITransaction) => {
  //   try {
  //     return await TransactionSchema.findOneAndUpdate(
  //       { _id: transaction._id },
  //       transaction,
  //       { new: true, upsert: true }
  //     );
  //   } catch (err) {
  //     throw new Error(`Server Error, could not update transaction: ${err}`);
  //   }
  // },
};
