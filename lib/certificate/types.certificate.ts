export enum certificateEnum {
    REINVESTMENT = 'Reinvestment',
    NO_REINVESTMEN = 'NoReinvestment',
}

export class IFinantialCertificate {
    amount!: number;
    rate!: number;
    term!: number;
    govermentTaxPercent!: number;
    date!: Date;
}

export class matrizCertificate extends IFinantialCertificate {
    certificate!: ICertificateResult[];
    constructor() {
        super();
    }
}

export interface ICertificateResult {
    order: number;
    amount: number;
    interest: number;
    percenDiscount: string;
    govermentDiscount: number;
    cleanInterestEarn: number;
    newAmount: number;
    type: string;
    date: Date;
}
