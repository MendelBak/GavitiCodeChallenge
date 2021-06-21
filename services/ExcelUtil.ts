var { Parser } = require('json2csv');

export default class ExportUtil {
  static generateCSVFile = async (data: any) => {
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

      const json2csvParser = new Parser({ fields: fields });

      return await json2csvParser.parse(data);
    } catch (error) {
      console.log('error:', error.message);
      throw new Error();
    }
  };
}
