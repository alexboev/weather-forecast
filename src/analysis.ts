import { IDay, IDayTemperaturePart } from "./store/store";
import { getOneMostFrequent, hasValue } from "./utils/general";
import { average } from "./utils/math";

/** returns the slices of the day temperature we'd like to use in our calculations */
export function getPartsToUseInPrediction(
    day: IDay, // the collected day data
    useNightPartsInPredictions: boolean // should we consider night temperatures
    
    ): IDayTemperaturePart[]{
    return useNightPartsInPredictions 
            ? day.temperatureParts
            : day.temperatureParts.filter(part => part.isDayTime);
}

/** Calculates the average day temperature */
export function getDayTemperature(
    day: IDay, // the collected day data 
    useNightPartsInPredictions: boolean  // should we consider night temperatures
    ): number {
    let partsToUseInPrediction = getPartsToUseInPrediction(day, useNightPartsInPredictions);
    let dayTemperatures = partsToUseInPrediction.map(part => part.temperatureKelvin);
    return average(dayTemperatures);
}

/** Calculate the average day weather */
export function getDayWeatherIcon(
    day: IDay, // the collected day data
    useNightPartsInPredictions: boolean // should we consider night temperatures
    ): string | null {
    let partsToUseInPrediction = getPartsToUseInPrediction(day, useNightPartsInPredictions);
    let dayWeatherIcons = partsToUseInPrediction.map(part => part.weatherIcon);

    /*  we can't get "average" weather icon so we do the most reasonable thing we can - we get the most 
        frequently appearing icon
    */
    let mostFrequentIcon = getOneMostFrequent(dayWeatherIcons);

    return mostFrequentIcon;
}