import test from 'node:test';
import assert from 'node:assert';
import Certificate from '../../lib/certificate/certificate';
import { certificateEnum } from '../../lib/certificate/types.certificate';

test('Certificate Calculations', async (t) => {
    const amount = 10000;
    const rate = 12; // 12%
    const term = 12; // 12 months
    const govermentTaxPercent = 10; // 10%
    const testDate = new Date('2025-10-07');

    await t.test('NoReinvestmentCertificate basic calculation', async (t) => {
        const result = Certificate.NoReinvestmentCertificate(amount, rate, term, govermentTaxPercent, testDate);

        assert.equal(result.amount, amount, 'Initial amount should match input');
        assert.equal(result.rate, rate, 'Rate should match input');
        assert.equal(result.term, term, 'Term should match input');
        assert.equal(result.certificate.length, term, 'Should have correct number of entries');
        assert.equal(result.govermentTaxPercent, 0.1, 'Government tax should be converted to decimal');
    });

    await t.test('NoReinvestmentCertificate interest calculations', async (t) => {
        const result = Certificate.NoReinvestmentCertificate(amount, rate, term, govermentTaxPercent, testDate);
        const firstEntry = result.certificate[0];

        // Calculate expected values
        const expectedMonthlyInterest = Math.round(((amount * (rate / 100)) / 12) * 100) / 100;
        const expectedTax = Math.round(expectedMonthlyInterest * 0.1 * 100) / 100;
        const expectedCleanEarnings = Math.round((expectedMonthlyInterest - expectedTax) * 100) / 100;

        assert.equal(firstEntry.interest, expectedMonthlyInterest, 'Monthly interest should be calculated correctly');
        assert.equal(firstEntry.govermentDiscount, expectedTax, 'Government tax should be calculated correctly');
        assert.equal(firstEntry.cleanInterestEarn, expectedCleanEarnings, 'Clean earnings should be calculated correctly');
    });

    await t.test('ReinvestmentCertificate calculations', async (t) => {
        const result = Certificate.ReinvestmentCertificate(amount, rate, term, govermentTaxPercent, testDate);

        assert.equal(result.amount, amount, 'Initial amount should match input');
        assert.equal(result.certificate.length, term, 'Should have correct number of entries');
        assert.equal(result.certificate[0].type, certificateEnum.REINVESTMENT, 'Should be marked as reinvestment type');

        // Verify increasing interest due to reinvestment
        let previousInterest = result.certificate[0].interest;
        for (let i = 1; i < result.certificate.length; i++) {
            assert.ok(result.certificate[i].interest > previousInterest, `Interest should increase at period ${i + 1} due to reinvestment`);
            previousInterest = result.certificate[i].interest;
        }
    });
});

test('Certificate Validation', async (t) => {
    await t.test('should validate input parameters', async (t) => {
        // Test negative amount
        assert.throws(() => Certificate.NoReinvestmentCertificate(-1000, 12, 12, 10), /Validation error/, 'Should reject negative amount');

        // Test invalid rate
        assert.throws(() => Certificate.NoReinvestmentCertificate(10000, 0, 12, 10), /Validation error/, 'Should reject zero rate');

        // Test invalid term
        assert.throws(() => Certificate.NoReinvestmentCertificate(10000, 12, 0, 10), /Validation error/, 'Should reject zero term');

        // Test invalid government tax
        assert.throws(() => Certificate.NoReinvestmentCertificate(10000, 12, 12, 0), /Validation error/, 'Should reject zero government tax');
    });
});
