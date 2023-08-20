import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksController } from './stocks/stocks.controller';
import { StocksService } from './stocks/stocks.service';
import { ExcelController } from './excel/excel.controller';
import { ExcelService } from './excel/excel.service';

@Module({
  imports: [],
  controllers: [AppController, StocksController, ExcelController],
  providers: [AppService, StocksService, ExcelService],
})
export class AppModule {}
