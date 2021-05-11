import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IForecastResponse, loadForecastFromServer } from '../backend/backend';
import { UnixDateTime } from '../utils/dates';

//#region selectors

export const getLoadingStatus = (rootState: any)  => {
    let forecastState: IState = rootState.forecast;
    return forecastState.loading.status;
};

export const getLoadingError = (rootState: any)  => {
    let forecastState: IState = rootState.forecast;
    return forecastState.loading.error;
};



export const getDays = (rootState: any)  => {
    let forecastState: IState = rootState.forecast;
    return forecastState.days;
};

export const getQuery: (rootState: any) => string = (rootState: any)  => {
    let forecastState: IState = rootState.forecast;
    return <string>forecastState.query;
};

export const getTimeZoneOffsetInHours: (rootState: any) => number = (rootState: any)  => {
    let forecastState: IState = rootState.forecast;
    return <number>forecastState.city.timeZoneOffsetInHours;
};

export const getCity: (rootState: any) => string | null = (rootState: any)  => {
    let forecastState: IState = rootState.forecast;
    return forecastState.city.name;
};

export const getCountry: (rootState: any) => string | null = (rootState: any)  => {
    let forecastState: IState = rootState.forecast;
    return forecastState.city.country;
};

//#endregion 

//#region thunks
/** the loading of the forecast data from the API */
export const loadForecast = createAsyncThunk('loadForecast', async (
    /** the location query text */
    location: string
    ) => {
    const response = await loadForecastFromServer(location);
    return response;
});
//#endregion

export interface IDayTemperaturePart {
    dateTime: number;
    isDayTime: boolean;
    temperatureKelvin: number;
    weatherIcon: string | null;
    weatherId: number | null;
    weatherTitle: string | null;
}

export interface IDay {
    date: number;
    temperatureParts: IDayTemperaturePart[];
}

function processBackendData(response: IForecastResponse): {
    /** all the weather data grouped by dates */
    days: IDay[],
    /** the location info */
    city: {
        name: string,
        country: string,
        timeZoneOffsetInHours: number
    }
} {
    /*  The API returns dates in UTC format with the separate timezone info 
        for the requested location. The timezone shift arrives to us in seconds.
        We use the Luxon dates management library which operates with hours. So
        we need to convert.
    */
    const secondsInHour = 3600;
    let forecastTimeZoneHours = response.city.timezone / secondsInHour;

    /*  The data arrives in 3-hour slices but we need to show the average daily forecast.
        so we need to group data by days.
    */
    let daysDictionary = new Map<
        number, // date in seconds. It's easier to compare such dates and to we can store them in Redux.
        IDay // All the data collected for the single day
        >();

    // let's process the data slices
    response.list.forEach(dayPartData => {
        // let's extract the date for the slice.
        let dayPartDateTime = new UnixDateTime(dayPartData.dt, forecastTimeZoneHours);

        // in order to compare dates for the different slices we need to discard the time info
        let normalizedDate = dayPartDateTime.getDateWithoutTime();
        let dayDate = normalizedDate.getSeconds();

        /*  let's prepare the data "container" for the day of our slice - it's where we will store 
            all the slices for the same day. We use the existing container or create the new one if 
            it doesn't exists.
        */
        let day: IDay;
        if (daysDictionary.has(dayDate)){
            // if we have already processed some data for the same day let's append.
            day = <IDay>daysDictionary.get(dayDate);
        } else {
            // if it's the first slice for the date let's create the container
            day = {
                date: dayDate, // the date of our grouped slices
                temperatureParts: [], // the slices' data
            };
            daysDictionary.set(dayDate, day);
        }

        // let's create an alias for the weather info of the slice for the sake of code simplicity
        let dayPartWeather = dayPartData.weather[0];

        // the slice contains a lot of various data. Let's collect what we need.
        day.temperatureParts.push({
            dateTime: dayPartDateTime.getSeconds(), // the date
            temperatureKelvin: dayPartData.main.temp, // the temperature
            weatherIcon: dayPartWeather.icon, // the weather icon
            weatherId: dayPartWeather.id, // the weather category
            weatherTitle: dayPartWeather.main, // the weather description
            isDayTime: dayPartDateTime.isDayTime() // is the slice from the "day time" part of the whole day
        });
    });

    // let's return the collected data
    let days = Array.from(daysDictionary.values());
    return {
        days, // the assembled days
        city: { // the location we have recieved forecast for
            name: response.city.name, // the name of the city
            country: response.city.country, // the country 
            timeZoneOffsetInHours: forecastTimeZoneHours // the timezone
        }
    };
}

//#region State
interface IState {
    loading: {
        status: 'idle' | 'loading' | 'succeeded' | 'failed',
        error: string | null
    },
    days: IDay[],
    city: {
        timeZoneOffsetInHours: number | null,
        name: string | null,
        country: string | null
    },
    query: string | null
}

var initialState: IState = {
    loading: {
        status: 'idle',
        error: null
    },
    days: [],
    city: {
        country: null,
        name: null,
        timeZoneOffsetInHours: null
    },
    query: null
};

//#endregion

//#region Slice
export const forecastSlice = createSlice({
    name: 'forecast',
    initialState: initialState,
    reducers: {
        setQuery: (state, action: {
            payload: {
                query: string
            }
        }) => {
            state.query = action.payload.query;
            state.loading.status = 'idle';
            state.loading.error = null;
        },
        clearQuery: (state, action) => {
            state.query = null;
            state.loading.status = 'idle';
            state.loading.error = null;
        }
    },
    extraReducers: builder => {
//#region forecast loading thunk processing
        // we are waiting for the API response
        builder.addCase(loadForecast.pending, (state: IState, action) => {
            state.loading.status = 'loading';
        });
        // we have successfully recieved the data from the API
        builder.addCase(loadForecast.fulfilled, (state, action) => {
            state.loading.status = 'succeeded';
            let processedData = processBackendData(action.payload);
            state.days = processedData.days;
            state.city.name = processedData.city.name;
            state.city.country = processedData.city.country;
            state.city.timeZoneOffsetInHours = processedData.city.timeZoneOffsetInHours;
        });
        // we have recieved the error instead of the data from the API
        builder.addCase(loadForecast.rejected, (state, action) => {
            state.loading.status = 'failed';
            state.loading.error = <string>action.error.message;
        })
//#endregion
      }
});

//#endregion