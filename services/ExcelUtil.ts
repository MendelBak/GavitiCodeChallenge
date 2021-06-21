const Blob = require('cross-blob');
var { Parser } = require('json2csv');

export default class ExportUtil {
  static generateCSVFile = (data: any) => {
    try {
      const fields = [
        {
          label: 'ID',
          value: '_id',
        },
        {
          label: 'Customer ID',
          value: 'customerId',
        },
        {
          label: 'Invoice ID',
          value: 'invoiceId',
        },
        {
          label: 'Created At',
          value: 'createdAt',
        },
        {
          label: 'Updated At',
          value: 'updatedAt',
        },
      ];

      const json2csv = new Parser({ fields: fields });

      const csv = json2csv.parse(data);
      console.log('🚀 ~ csv', csv);
      return csv;
    } catch (error) {
      console.log('error:', error.message);
      throw new Error();
    }
  };
}
