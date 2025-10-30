import { matrizAmortization, AmortizationResult, Amortization as IAmartization } from './types.amortization';
import { DateClass, ValidationSchema, validateParams } from '../utils/index';

class Amortization {
    private readonly staticMonthlyRateFee = 1200;
    private futureDate: Date[] = [];
    constructor() {}

    public amortization(amount: number, rate: number, term: number, commission = 0, dateFrom = new Date()): matrizAmortization {
        this.paramsValidation(amount, rate, term, commission, dateFrom);
        try {
            const monthyRate = this.monthlyRateFee(rate);
            const numerator = this.numerator(monthyRate, term);
            const denominator = this.denominator(monthyRate, term);
            const monthlyFee = this.fee(amount, numerator, denominator);
            const monthlyInterest = this.interest(amount, monthyRate);
            const amortization = this.calculateAmortization(monthlyFee, monthlyInterest);
            const balance = this.balance(amount, amortization);
            const matriz = this.calculateMatriz(monthlyFee, balance, monthlyInterest, amortization, term, monthyRate, dateFrom);
            return {
                amount,
                rate,
                term,
                commission,
                amortizations: matriz,
            };
        } catch (error) {
            throw new Error(`Validation error:${(error as Error).message}`);
        }
    }
    private monthlyRateFee(rate: number): number {
        return rate / this.staticMonthlyRateFee;
    }
    private numerator(monthyRate: number, term: number): number {
        return monthyRate * Math.pow(1 + monthyRate, term);
    }
    private denominator(monthlyRateFee: number, term: number): number {
        return Math.pow(1 + monthlyRateFee, term) - 1;
    }

    private fee(amount: number, numerator: number, denominator: number): number {
        return Number((amount * (numerator / denominator)).toFixed(2));
    }

    private interest(amount: number, monthyRate: number): number {
        return Number((amount * monthyRate).toFixed(2));
    }
    private calculateAmortization(monthlyFee: number, monthlyInterest: number, commission = 0): number {
        return Number((monthlyFee - monthlyInterest - commission).toFixed(2));
    }
    private balance(currentAmount: number, amortization: number): number {
        return Number((currentAmount - amortization).toFixed(2));
    }
    private calculateMatriz(
        monthlyFee: number,
        currentAmount: number,
        monthlyInterest: number,
        amortization: number,
        term: number,
        monthlyRate: number,
        dateFrom: Date
    ): AmortizationResult[] {
        this.futureDate = DateClass.getFutureDate(dateFrom, term) as Date[];
        const result = new Array(term);
        let newInterest = monthlyInterest;
        let newAmortization = amortization;
        let newBalance = currentAmount;
        for (let i = 0; i < term; i++) {
            result[i] = {
                order: i + 1,
                fee: monthlyFee,
                interest: newInterest,
                amortization: newAmortization,
                balance: newBalance,
                date: this.futureDate[i],
            };
            newInterest = this.interest(newBalance, monthlyRate);
            newAmortization = this.calculateAmortization(monthlyFee, newInterest);
            newBalance = this.balance(newBalance, newAmortization);
        }
        result[result.length - 1].balance = 0;
        return result;
    }
    private paramsValidation(amount: number, rate: number, term: number, commission = 0, dateFrom = new Date()) {
        const params: IAmartization = {
            amount,
            rate,
            term,
            commission,
            date: dateFrom,
        };
        const schema: ValidationSchema<IAmartization> = {
            amount: { type: 'number', required: true, min: 1 },
            rate: { type: 'number', required: true, min: 1, max: 480 },
            term: { type: 'number', required: true, min: 1, integer: true },
            commission: { type: 'number', required: false, min: 0 },
            date: { type: 'date', required: false },
        };
        try {
            validateParams(params, schema);
        } catch (error) {
            throw new Error(`Validation error:${(error as Error).message}`);
        }
    }
}

export default new Amortization();
