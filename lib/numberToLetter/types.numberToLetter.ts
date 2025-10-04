export interface config {
    NITS: string[];
    TENS: string[];
    HUNDREDS: string[];
}

export interface ConvertInterface {
    number: string | number;
    letter: string;
    cents: string;
    fullDescription: string;
    rate?: string;
}
