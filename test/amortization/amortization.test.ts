import test from 'node:test';
import assert from 'node:assert';
import Amortization from '../../lib/amortization/amortization';

test('Amortization Calculations', async (t) => {
    const amount = 10000;
    const rate = 12; // 12%
    const term = 12; // 12 months
    const commission = 0;
    const testDate = new Date('2025-10-07');

    await t.test('basic amortization calculation', async (t) => {
        const result = Amortization.amortization(amount, rate, term, commission, testDate);

        assert.equal(result.amount, amount, 'Amount should match input');
        assert.equal(result.rate, rate, 'Rate should match input');
        assert.equal(result.term, term, 'Term should match input');
        assert.equal(result.commission, commission, 'Commission should match input');
        assert.equal(result.amortizations.length, term, 'Should have correct number of payments');
    });

    await t.test('monthly fee consistency', async (t) => {
        const result = Amortization.amortization(amount, rate, term, commission, testDate);
        const monthlyFee = result.amortizations[0].fee;

        // Check if monthly fee is constant
        result.amortizations.forEach((row) => {
            assert.equal(row.fee, monthlyFee, 'Monthly fee should be constant throughout the term');
        });

        // Verify total amortization equals initial amount
        const totalAmortization = result.amortizations.reduce((sum, row) => sum + row.amortization, 0);
        assert.ok(Math.abs(Math.round(totalAmortization) - amount) <= 1, 'Total amortization should approximately equal initial amount');
    });

    await t.test('balance progression', async (t) => {
        const result = Amortization.amortization(amount, rate, term, commission, testDate);

        // Check decreasing balance
        for (let i = 1; i < result.amortizations.length; i++) {
            assert.ok(result.amortizations[i].balance < result.amortizations[i - 1].balance, `Balance should decrease at payment ${i}`);
        }

        // Verify final balance is zero
        assert.equal(result.amortizations[term - 1].balance, 0, 'Final balance should be zero');
    });
});

test('Amortization Validation', async (t) => {
    await t.test('should reject invalid inputs', async (t) => {
        // Test negative amount
        assert.throws(() => Amortization.amortization(-1000, 12, 12), /Validation error/, 'Should reject negative amount');

        // Test zero rate
        assert.throws(() => Amortization.amortization(10000, 0, 12), /Validation error/, 'Should reject zero rate');

        // Test invalid term
        assert.throws(() => Amortization.amortization(10000, 12, 0), /Validation error/, 'Should reject zero term');

        // Test negative commission
        assert.throws(() => Amortization.amortization(10000, 12, 12, -1), /Validation error/, 'Should reject negative commission');
    });

    await t.test('calculation integrity', async (t) => {
        const result = Amortization.amortization(10000, 12, 12);

        // Verify interest and amortization sum equals monthly fee
        result.amortizations.forEach((payment, index) => {
            const sumComponents = payment.interest + payment.amortization;
            assert.ok(Math.abs(sumComponents - payment.fee) <= 0.02, `Payment ${index + 1}: Interest + Amortization should equal Monthly Fee`);
        });
    });
});
