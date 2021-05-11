export function average(values: number[]): number {
    let sum = values.reduce((prev, current) => prev + current, 0);
    return sum / values.length;
}