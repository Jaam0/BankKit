import NumberToLetter from './numberToLetter/numberToLetter';
import Certificate from './certificate/certificate';
import Amortization from './amortization/amortization';

export function convertToNumber(numberToLetter: number | string) {
    try {
        if (typeof numberToLetter !== 'number' && typeof numberToLetter !== 'string') {
            throw new Error('Input must be a number or a string representing a number.');
        }
        return NumberToLetter.convert(numberToLetter);
    } catch (error: unknown) {
        throw new Error('Error converting number to letter: ' + error);
    }
}

export function calCertificatenoReinvestment(amount: number, rate: number, term: number, govermentTaxPercent: number, dateFrom = new Date()) {
    return Certificate.NoReinvestmentCertificate(amount, rate, term, govermentTaxPercent, dateFrom);
}
export function calCertificateReinvestment(amount: number, rate: number, term: number, govermentTaxPercent: number, dateFrom = new Date()) {
    return Certificate.ReinvestmentCertificate(amount, rate, term, govermentTaxPercent, dateFrom);
}

export function calAmortization(amount: number, rate: number, term: number, commission = 0, dateFrom = new Date()) {
    return Amortization.amortization(amount, rate, term, commission, dateFrom);
}
