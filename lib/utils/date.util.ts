class DateCertificate {
    private datesOutput: Date[] = [];
    constructor() {}
    public getFutureDate(startDate: Date, round = 0): Date | Date[] {
        try {
            const futureDate = startDate ? new Date(startDate) : new Date();
            if (round === 0) {
                futureDate.setMonth(futureDate.getMonth() + round);
                return futureDate;
            }
            for (let index = 0; index < round; index++) {
                this.datesOutput.push(new Date(futureDate.setMonth(futureDate.getMonth() + 1)));
            }
            return this.datesOutput;
        } catch (error) {
            throw new Error(`Error calculating future date ${error}`);
        }
    }
}

export default new DateCertificate();
