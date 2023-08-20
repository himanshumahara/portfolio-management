import { Controller, Get, Res } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { ExcelService } from './excel.service';
import { Response } from 'express';
import { StocksService } from '../stocks/stocks.service';

@Controller('excel')
export class ExcelController {
    constructor(private readonly excelService: ExcelService, private readonly stockService: StocksService) { }

    @Get('read')
    async readExcel() {
        const workbook = new ExcelJS.Workbook();
        const filesheet = await workbook.xlsx.readFile('uploads/Stocks_MF Portfolio.xlsx');
        const worksheets = filesheet.getWorksheet('Stocks');
        //console.log(worksheets.columnCount)
        for (let i = 5; i < worksheets.rowCount; i++) {
            const symbol = worksheets.getCell(`D${i}`).value as string;

            if (symbol) {
                const detail = await this.stockService.getStockDetail(symbol);
                const row = worksheets.getRow(i);
                
                console.log(symbol,detail?.priceInfo?.close);
                row.getCell(`G`).value = detail?.priceInfo?.close;
                row.commit();
            }

        }
        workbook.xlsx.writeFile('uploads/Stocks_MF Portfolio2.xlsx');
        // console.log(worksheets.getSheetValues());
        return 'This will read excel file';

    }
}
