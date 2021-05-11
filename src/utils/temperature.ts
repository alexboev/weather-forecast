export function celsiusFromKelvin(temperatureKelvin: number): number {
    // Celsius = (Kelvin – 273.15)
    return temperatureKelvin - 273.15;
}

export function fahrenheitFromKelvin(temperatureKelvin: number): number {
    // Fahrenheit = Celsius × 9/5 + 32
    return celsiusFromKelvin(temperatureKelvin) * 9/5 + 32;
}