import express, { Router } from 'express';
const router: Router = express.Router();
import transactionController from '../../controllers/transaction.controller';

// Returns all transactions
router.get('/', async (req, res, next) => {
  try {
    const transactions = await transactionController.getAllTransaction();
    res.status(200).send(transactions);
  } catch (err) {
    next(err);
  }
});

// Creates one transaction record
router.post('/createTransaction', async (req, res, next) => {
  try {
    const newTransaction = await transactionController.createTransaction(
      req.body
    );
    res.status(201).send(newTransaction);
  } catch (err) {
    console.log('error creating new transaction ', err);
    next(err);
  }
});

// GET one transaction
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

// GET transactions between two date ranges.
router.get(
  '/getTransactionRange/:startDate/:endDate',
  async (req, res, next) => {
    try {
      // Convert string params into UNIX date format.
      // This was a bit tricky to figure out. I haven't worked with dates in a while and dates can be very tricky. I had some trouble getting the UNIX timestamp to behave.
      let startDate: Date = new Date(parseInt(req.params.startDate));
      let endDate: Date = new Date(parseInt(req.params.endDate));

      const csvFile = await transactionController.getTransactionRange(
        startDate,
        endDate
      );

      res.header('Content-Type', 'text/csv');
      res.attachment('gavitiCSVFile.csv');
      res.status(200).send(csvFile);
    } catch (err) {
      console.log('Server error: Could not get transaction range', err);
      next(err);
    }
  }
);

// I did not test this route during the creation of this coding challenge, since it's not part of the challenge requirements, but it should work.
// router.put('/updateTransaction', async (req, res, next) => {
//   try {
//     await transactionController.updateTransaction(req.body);
//     res.status(201).send();
//   } catch (err) {
//     console.log('Error updating transaction', err);
//     next(err);
//   }
// });

export default router;
