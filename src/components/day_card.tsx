import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import WeatherConditionsIcon from './weather_conditions_icon';
import { celsiusFromKelvin, fahrenheitFromKelvin } from '../utils/temperature';
import { UnixDateTime } from '../utils/dates';
import { useSelector } from 'react-redux';
import { getTimeZoneOffsetInHours } from '../store/store';
import { CardHeader, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      //minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  /** The single day weather info card */
const DayCard = (props: {
    /** the average day temperature */
    temperature: number,
    /** the date we show the weather for */
    date: number,
    /** should we show the temperature as Fahrenheit */
    isFahrenheit: boolean,
    /** The weather icon for the day */
    icon: string | null,
    /** Has user clicked on our card to select this day to show the details */
    selected: boolean,
    /** The user has clicked on our day to select this day to show the details */
    onSelect: () => void
}) => {
    const classes = useStyles();

    const theme = useTheme();

    // let's calculate both the temperature modes
    const temperatureCelsius = Math.round(celsiusFromKelvin(props.temperature));
    const temperatureFahrenheit = Math.round(fahrenheitFromKelvin(props.temperature));

    // let's get the current date with resprect to its timezone
    const timeZoneOffsetInHours = useSelector(getTimeZoneOffsetInHours);
    const date = new UnixDateTime(props.date, timeZoneOffsetInHours);

    return (
        <Card elevation={props.selected ? 20 : 5} className={classes.root} onClick={() => {
          props.onSelect();
        }}>
          <CardHeader title={
          <Typography 
            variant="h5"
            >
              {date.getDisplayText()}
            </Typography>
        }>
          
        </CardHeader>
      <CardContent>
        
        <Grid container justify="center" alignItems="center">
            <Grid item>
              <Typography style={{
                minWidth: `${130}px`
              }} variant="h2">
                {props.isFahrenheit && <>{temperatureFahrenheit}&#8457;</>}
                {!props.isFahrenheit && <>{temperatureCelsius}&#8451;</>}
              </Typography>
            </Grid>
            <Grid item>
              <WeatherConditionsIcon icon={props.icon}/>
            </Grid>
        </Grid>
        
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">Details</Button>
      </CardActions>
    </Card>
    );
};

export default DayCard;