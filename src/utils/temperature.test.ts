import { celsiusFromKelvin, fahrenheitFromKelvin } from "./temperature";

describe("temperature utils", () => {
    test("convert Kelvin to Celsius correctly", () => {
        let kelvin = 286.2;
        let celsius = 13.05;
        
        expect(celsiusFromKelvin(kelvin)).toBeCloseTo(celsius);
    });

    test("convert Kelvin to Fahrenheit correctly", () => {
        let kelvin = 286.2;
        let fahrenheit = 55.49;
        
        expect(fahrenheitFromKelvin(kelvin)).toBeCloseTo(fahrenheit);
    });
});