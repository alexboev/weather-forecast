import { average } from "./math";

describe("math utils correctly", () => {
    test("return average", () => {
        let numbers = [1, 2, 3, 4, 5];

        expect(average(numbers)).toBeCloseTo(3);
    });

    test("return the number itself when it is single", () => {
        let numbers = [15];
        expect(average(numbers)).toBeCloseTo(15);
    });
})