import { ICertificateResult, certificateEnum, matrizCertificate, IFinantialCertificate } from './types.certificate';
import { DateClass, ValidationSchema, validateParams } from '../utils/index';

class Certitificate {
    constructor() {
        // TODO: Calcular la penalidad si te retiras antes del plazo
    }

    public NoReinvestmentCertificate(
        amount: number,
        rate: number,
        term: number,
        govermentTaxPercent: number,
        dateFrom = new Date()
    ): matrizCertificate {
        this.paramsValidation(amount, rate, term, govermentTaxPercent, dateFrom);
        const futureDate = DateClass.getFutureDate(dateFrom, term) as Date[];
        const result = new Array(term);
        const ttInterest = this.calculateTt(amount, rate);
        govermentTaxPercent = this.convertPercent(govermentTaxPercent);
        const interestValue = this.round(ttInterest);
        const taxValue = this.round(interestValue * govermentTaxPercent);
        let newAmount = amount;
        const cleanInterestEarn = this.round(interestValue - taxValue);
        try {
            for (let i = 0; i < term; i++) {
                result[i] = {
                    order: i + 1,
                    amount: newAmount,
                    interest: interestValue,
                    percenDiscount: govermentTaxPercent * 100 + '%',
                    govermentDiscount: taxValue,
                    cleanInterestEarn: cleanInterestEarn,
                    newAmount: newAmount + cleanInterestEarn,
                    type: certificateEnum.NO_REINVESTMEN,
                    date: futureDate[i],
                };
                newAmount += cleanInterestEarn;
            }
            return {
                amount: amount,
                rate: rate,
                term: term,
                govermentTaxPercent: govermentTaxPercent,
                date: dateFrom,
                certificate: result as ICertificateResult[],
            };
        } catch (error) {
            throw Error(`Something happen calculating in NoReinvestment ${error}`);
        }
    }
    public ReinvestmentCertificate(
        amount: number,
        rate: number,
        term: number,
        govermentTaxPercent: number,
        dateFrom = new Date()
    ): matrizCertificate {
        this.paramsValidation(amount, rate, term, govermentTaxPercent, dateFrom);
        const result = new Array(term);
        const futureDate = DateClass.getFutureDate(dateFrom, term) as Date[];
        const ttInterest = this.calculateTt(amount, rate);
        govermentTaxPercent = this.convertPercent(govermentTaxPercent);
        let interestValue = this.round(ttInterest);
        let newAmount = amount;
        let taxValue;
        let cleanInterestEarn;
        try {
            for (let i = 0; i < term; i++) {
                taxValue = this.round(interestValue * govermentTaxPercent);
                cleanInterestEarn = this.round(interestValue - taxValue);
                result[i] = {
                    order: i + 1,
                    amount: this.round(newAmount),
                    interest: interestValue,
                    percenDiscount: govermentTaxPercent * 100 + '%',
                    govermentDiscount: taxValue,
                    cleanInterestEarn: cleanInterestEarn,
                    newAmount: this.round(newAmount + cleanInterestEarn),
                    type: certificateEnum.REINVESTMENT,
                    date: futureDate[i],
                };
                newAmount += cleanInterestEarn;
                interestValue = this.round((newAmount * (rate / 100)) / 12);
            }
            return {
                amount: amount,
                rate: rate,
                term: term,
                govermentTaxPercent: govermentTaxPercent,
                date: dateFrom,
                certificate: result as ICertificateResult[],
            };
        } catch (error) {
            throw Error(`Something happen calculating in Reinvestment ${error}`);
        }
    }
    private calculateTt(amount: number, rate: number): number {
        return (amount * (rate / 100)) / 12;
    }
    private round(value: number): number {
        return Math.round(value * 100) / 100;
    }
    private convertPercent(value: number): number {
        return value % 1 === 0 ? value / 100 : value;
    }
    private paramsValidation(amount: number, rate: number, term: number, govermentTaxPercent: number, dateFrom = new Date()) {
        const params: IFinantialCertificate = {
            amount,
            rate,
            term,
            govermentTaxPercent,
            date: dateFrom,
        };
        const schema: ValidationSchema<IFinantialCertificate> = {
            amount: { type: 'number', required: true, min: 1 },
            rate: { type: 'number', required: true, min: 1, max: 480, integer: true },
            term: { type: 'number', required: true, min: 1, integer: true },
            govermentTaxPercent: { type: 'number', required: true, min: 1, integer: true },
            date: { type: 'date', required: false },
        };
        try {
            validateParams(params, schema);
        } catch (error) {
            throw new Error(`Validation error:${(error as Error).message}`);
        }
    }
}

export default new Certitificate();
