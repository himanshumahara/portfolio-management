import { Controller, Post, Res, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
    constructor(private readonly stockService: StocksService) {

    }
    @Post('detail')
    async getStockDetail(@Body() body: any,@Res() res:Response) {

        const detail = await this.stockService.getStockDetail(body?.symbol);
        return res.json(detail);

    }

    @Post('price')
    async getStockPrice(@Body() body: any,@Res() res:Response) {

        const detail = await this.stockService.getStockDetail(body?.symbol);
        return res.json({priceInfo:{...detail.priceInfo}});

    }
}
