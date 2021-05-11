import React from 'react';
import Grid from '@material-ui/core/Grid';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { getTimeZoneOffsetInHours, IDay } from '../store/store';
import { UnixDateTime } from '../utils/dates';
import { celsiusFromKelvin, fahrenheitFromKelvin } from '../utils/temperature';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@material-ui/core';
import { hasValue } from '../utils/general';

/** The detailed stats for the single day */
const DayDetails = (props: {
    /** The day we should show stats for */
    day: IDay | undefined,
    /** Should we show the temperatures as Fahrenheit */
    isFahrenheit: boolean,
}) => {
    // let's find out the location's timezone
    const timeZoneOffsetInHours = useSelector(getTimeZoneOffsetInHours);

    // let's prepare the data for the temperature bars of our chart
    let data: any[] = [];

    // if the user has selected the day
    if (props.day){
        // prepare one chart bar for each temperature slices of the day
        props.day.temperatureParts.forEach(part => {
            // adjust the slice time title
            let timeTitle = new UnixDateTime(part.dateTime, timeZoneOffsetInHours).getTimeDisplayText();
            
            // calculate both possible temperature modes
            const temperatureCelsius = Math.round(celsiusFromKelvin(part.temperatureKelvin));
            const temperatureFahrenheit = Math.round(fahrenheitFromKelvin(part.temperatureKelvin));

            // prepare the slice data according to the chart bindings
            let item = {
                /** the time of the slice */
                name: timeTitle,
                /** the temperature */
                temp: props.isFahrenheit ? temperatureFahrenheit : temperatureCelsius
            };

            data.push(item);
        });
    }

    return (
        <>
        <Grid container justify="center" alignItems="center" style={{
            marginTop: "30px"
        }}>
            <Grid item>
            <Typography variant="h5">{
                props.day 
                ? `Temperatures for ${new UnixDateTime(props.day.date, timeZoneOffsetInHours).getDisplayText()}` 
                : "Select the day to see the details"
                }
            </Typography>
            </Grid>
        </Grid>    
            <ResponsiveContainer width="100%" height={300}>
                    <BarChart width={730} height={250} data={data} barCategoryGap={5}>
                        
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar label dataKey="temp" fill="#8884d8" />
                        
                    </BarChart>
                </ResponsiveContainer>
        </>
    );
};

export default DayDetails;