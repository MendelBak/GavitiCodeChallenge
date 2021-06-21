import { Column, Workbook } from 'exceljs';
import * as fs from 'file-saver';
const Blob = require('cross-blob');
var { Parser } = require('json2csv');

export default class ExportUtil {
  static generateCSVFile = (data: any) => {
    const fields = [
      {
        label: 'customer_id',
        value: 'data?.customerId',
      },
      {
        label: 'Invoice ID',
        value: 'data?.invoiceId',
      },
      {
        label: 'ID',
        value: 'data?._id',
      },
      {
        label: 'Created At',
        value: 'data?.createdAt',
      },
      {
        label: 'Updated At',
        value: 'data?.updatedAt',
      },
    ];

    const json2csv = new Parser({ fields: fields });

    try {
      const csv = json2csv.parse(data);
      console.log('🚀 ~ csv', csv);
      return csv;
      //   res.attachment('data.csv');
      //   res.status(200).send(csv);
    } catch (error) {
      //   console.log('error:', error.message);
      //   res.status(500).send(error.message);
    }

    // const workbook = new Workbook();
    // workbook.creator = 'Me';
    // workbook.lastModifiedBy = 'Her';
    // workbook.created = new Date(1985, 8, 30);
    // workbook.modified = new Date();
    // workbook.lastPrinted = new Date(2016, 9, 27);
    // workbook.properties.date1904 = true;
    // const sheet = workbook.addWorksheet('Menachem Sheet');
    // sheet.columns = [
    //   { header: 'Id', key: 'id', width: 10 },
    //   { header: 'Name', key: 'name', width: 32 },
    //   { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 },
    // ] as Column[];

    // workbook.xlsx.writeBuffer({ useStyles: true }).then((buffer) => {
    //   let blob = new Blob([buffer], {
    //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   });
    //   fs.saveAs(blob, 'testFile.xlsx');
    // });
  };
}
