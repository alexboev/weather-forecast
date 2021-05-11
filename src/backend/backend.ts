import { hasText } from "../utils/general";

const apiKey = "75f972b80e26f14fe6c920aa6a85ad57";
const limitBy = 40;


export interface IForecastResponse_DayPart {
    dt: number,
    main: {
        temp: number,
        feels_like: number
    },
    weather: Array<{
        id: number,
        main: string,
        description: string,
        icon: string
    }>
}

/** Forecast data. See description here - https://openweathermap.org/forecast5#JSON */
export interface IForecastResponse {
    cod: string;
    message: string;
    cnt: number;
    list: IForecastResponse_DayPart[];
    city: {
        name: string,
        country: string,
        timezone: number;
    }
}

export function loadForecastFromServer(location: string): Promise<IForecastResponse> {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${apiKey}&cnt=${limitBy}`;
    return new Promise<IForecastResponse>((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // }
        })
            .then(response => {
                response.json().then((response: IForecastResponse) => {
                    if (response.cod == "200"){
                        resolve(response);
                    }
                    else {
                        if (hasText(response.message)){
                            reject(response.message);
                        }
                        else {
                            reject("Unknown error.");
                        }
                    }
                }).catch((error) => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            })
    });
}