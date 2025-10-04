export class Amortization {
    amount!: number;
    rate!: number;
    term!: number;
    commission?: number;
    date? = new Date();
}

export interface AmortizationResult {
    order: number;
    fee: number;
    interest: number;
    amortization: number;
    balance: number;
    date: Date;
}
export class matrizAmortization extends Amortization {
    amortizations!: AmortizationResult[];
    constructor() {
        super();
    }
}
