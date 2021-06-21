import express, { Router } from 'express';
const router: Router = express.Router();
import transactionController from '../../controllers/transaction.controller';
import ExcelUtil from '../../services/ExcelUtil';

// Returns all transactions
router.get('/', async (req, res, next) => {
  try {
    console.log('hit the get route');
    const transactions = await transactionController.getAllTransaction();
    res.status(200).send(transactions);
  } catch (err) {
    next(err);
  }
});

// Returning the model upon creation to return the _id that is auto-created by mongoose.
router.post('/createTransaction', async (req, res, next) => {
  try {
    console.log('create new transaction');
    const newTransaction = await transactionController.createTransaction(
      req.body
    );
    console.log('🚀 ~ router.post ~ newTransaction', newTransaction);
    res.status(201).send(newTransaction);
  } catch (err) {
    console.log('error creating new transaction ', err);
    next(err);
  }
});

router.get('/getTransaction/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const transaction = await transactionController.getTransaction(id);
    res.status(200).send(transaction);
  } catch (err) {
    console.log('Server error: Could not get transaction', err);
    next(err);
  }
});

router.get(
  '/getTransactionRange/:startDate/:endDate',
  async (req, res, next) => {
    try {
      // Convert string params into UNIX date format.
      // This was a bit tricky to figure out. I haven't worked with dates in a while and dates can be very tricky.
      let startDate: Date = new Date(parseInt(req.params.startDate));
      let endDate: Date = new Date(parseInt(req.params.endDate));

      const transactions = await transactionController.getTransactionRange(
        startDate,
        endDate
      );
      const test: any = ExcelUtil.generateCSVFile(transactions);
      res.attachment(test);
      res.status(200).send(transactions);

      // res.sendFile(test);
    } catch (err) {
      console.log('Server error: Could not get transaction range', err);
      next(err);
    }
  }
);

// router.put('/updateTransaction', async (req, res, next) => {
//   try {
//     await transactionController.updateTransaction(req.body);
//     res.status(201).send();
//   } catch (err) {
//     console.log('Error updating transaction', err);
//     next(err);
//   }
// });

// router.put('/updateTransactions', async (req, res, next) => {
//   try {
//     await transactionController.updateTransaction(req.body);
//     res.status(201).send();
//   } catch (err) {
//     console.log('Error updating transaction', err);
//     next(err);
//   }
// });

export default router;
