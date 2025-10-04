type ParamType = 'number' | 'string' | 'boolean' | 'date';

interface ValidationRule {
    type: ParamType;
    required?: boolean;
    min?: number;
    max?: number;
    integer?: boolean;
    customValidator?: (value: any) => boolean;
}

export type ValidationSchema<T> = {
    [K in keyof T]: ValidationRule;
};

export function validateParams<T>(params: T, schema: ValidationSchema<T>): void {
    for (const key in schema) {
        const rules = schema[key];
        const value = params[key];

        if (rules.required && (value === undefined || value === null)) {
            throw new Error(`"${key}" is required.`);
        }

        if (value === undefined || value === null) continue;

        switch (rules.type) {
            case 'number':
                if (typeof value !== 'number' || isNaN(value)) {
                    throw new Error(`"${key}" must be a valid number.`);
                }
                if (rules.min !== undefined && value < rules.min) {
                    throw new Error(`"${key}" must be >= ${rules.min}.`);
                }
                if (rules.max !== undefined && value > rules.max) {
                    throw new Error(`"${key}" must be <= ${rules.max}.`);
                }
                if (rules.integer && !Number.isInteger(value)) {
                    throw new Error(`"${key}" must be an integer.`);
                }
                break;

            case 'string':
                if (typeof value !== 'string') {
                    throw new Error(`"${key}" must be a string.`);
                }
                break;

            case 'boolean':
                if (typeof value !== 'boolean') {
                    throw new Error(`"${key}" must be a boolean.`);
                }
                break;

            case 'date':
                if (!(value instanceof Date) || isNaN(value.getTime())) {
                    throw new Error(`"${key}" must be a valid Date instance.`);
                }
                break;

            default:
                throw new Error(`Unknown type for "${key}".`);
        }

        if (rules.customValidator && !rules.customValidator(value)) {
            throw new Error(`"${key}" failed custom validation.`);
        }
    }
}
