export function renderSalary(
    minSalary: number | null,
    maxSalary: number | null,
    currency: string | null): string | null {
    if (!minSalary && !maxSalary) {
        return null;
    } else if (!minSalary && maxSalary) {
        return `up to ${maxSalary} ${currency}`;
    } else if (minSalary && !maxSalary) {
        return `from ${minSalary} ${currency}`;
    } else {
        return `${minSalary} - ${maxSalary} ${currency}`;
    }
}
