import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StocksService {
    constructor() { }

    private baseUrl = 'https://www.nseindia.com'
    private cookies = ''
    private cookieUsedCount = 0
    private cookieMaxAge = 60 // should be in seconds
    private cookieExpiry = new Date().getTime() + (this.cookieMaxAge * 1000)
    private noOfConnections = 0
    private baseHeaders = {
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
    }

    private async getNseCookies() {
        if (this.cookies === '' || this.cookieUsedCount > 10 || this.cookieExpiry <= new Date().getTime()) {
            const response = await axios.get(this.baseUrl, {
                headers: this.baseHeaders
            })
            const setCookies = response.headers['set-cookie']
            const cookies: string[] = []
            setCookies.forEach((cookie: string) => {
                const requiredCookies: string[] = ['nsit', 'nseappid', 'ak_bmsc', 'AKA_A2']
                const cookieKeyValue = cookie.split(';')[0]
                const cookieEntry = cookieKeyValue.split('=')
                if (requiredCookies.includes(cookieEntry[0])) {
                    cookies.push(cookieKeyValue)
                }
            })
            this.cookies = cookies.join('; ')
            this.cookieUsedCount = 0
            this.cookieExpiry = new Date().getTime() + (this.cookieMaxAge * 1000)
        }
        this.cookieUsedCount++
        return this.cookies
    }
    getStocks() { }
    async getStockDetail(symbol: string) {
        const detail =  await axios.get(`https://www.nseindia.com/api/quote-equity?symbol=${encodeURIComponent(symbol)}`,{
            headers: {
                ...this.baseHeaders,
                'Cookie': await this.getNseCookies(),
            }
        }).then((res)=>{
            return res.data;
        });
        return detail;
    }
}
