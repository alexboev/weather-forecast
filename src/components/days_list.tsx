import React from 'react';
import Grid from '@material-ui/core/Grid';
import DayCard from './day_card';
import { useSelector } from 'react-redux';
import { getDays, IDay, IDayTemperaturePart } from '../store/store';
import { average } from '../utils/math';
import { getDayTemperature, getDayWeatherIcon, getPartsToUseInPrediction } from '../analysis';

/** The cards list for days */
const DaysList = (props: {
    /** should we show the temperatures as Fahrenheit */
    isFahrenheit: boolean,
    /** should we consider the night temperatures when calculating the average day temps */
    useNightPartsInPredictions: boolean,
    /** the all days collected data */
    days: IDay[],
    /** the day card user has selected to show the day details in chart */
    selectedCard: number | null,
    /** user has selected the day card to show the day details in chart */
    onSelectCard: (date: number) => void
}) => {
    return (
        <Grid container spacing={2} direction="row" justify="center" alignItems="center">
            {
                props.days.map(day => (
                    <Grid key={day.date} item xs={12} sm={4}>
                        <DayCard
                            selected={day.date === props.selectedCard}
                            onSelect={() =>{
                                props.onSelectCard(day.date)
                            }}
                            isFahrenheit={props.isFahrenheit} 
                            temperature={getDayTemperature(day, props.useNightPartsInPredictions)} 
                            date={day.date}
                            icon={getDayWeatherIcon(day, props.useNightPartsInPredictions)}
                            />
                    </Grid>
                ))
            }
        </Grid>
    );
};

export default DaysList;