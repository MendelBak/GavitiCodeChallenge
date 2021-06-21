# Instructions for running Menachem Bakaleynik coding challenge at Gaviti.

- Navigate into the /backend directory and run `npm install`
- Make sure you have a mongoDB instance running locally. (On linux run `sudo systemctl start mongod` and then `sudo systemctl status mongod` to verify running status).
- Run `npm start`
- Create a few transactions by running `localhost:3000/transaction/createTransaction` so that there is something in the DB. The DB collection should be auto-created if the local DB is running properly. This is a POST route.
- Try some of the different routes. Get all transactions, get by id, etc.

This is the example GET request I ran to get a range of transaction in CSV format.
IMPORTANT: Make sure your UNIX timestamp is correct. I left some console logs to verify the date, during the conversion to Date in the controller.
`http://localhost:3000/transaction/getTransactionRange/1002227005000/1699994829321`
