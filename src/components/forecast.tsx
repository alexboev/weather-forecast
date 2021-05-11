import React, { useState } from 'react';
import logo from './logo.svg';
import './../App.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Temperature from './temperature';
import Pager from './pager';
import DaysList from './days_list';
import DayDetails from './day_details';
import { forecastSlice, getCity, getCountry, getDays, IDay } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getPartsToUseInPrediction } from '../analysis';
import Settings from './settings';
import { Container, Link, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

/** the loaded weather screen */
const Forecast = (props: {

}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const theme = useTheme();

    // we need to detect the MD breakpoint to adjust some layout details programmatically
    const mediumOrMore = useMediaQuery(theme.breakpoints.up('md'));

    // The state for the temperature mode selection
    const [isFahrenheit, setIsFahrenheit] = useState(true);

    // According to tech requirements we page data by 3
    const pageSize = 3;

    // Currently selected page
    const [currentPage, setCurrentPage] = useState(0);

    // All the data for the days
    const days: IDay[] = useSelector(getDays);

    // Should we consider night hours during our calculations
    const [useNightPartsInPredictions, setUseNightPartsInPredictions] = useState(false);

    // Should we ignore the days with too few data to analyze
    const [discardDaysWithTooFiewPartsToAnalyze, setDiscardDaysWithTooFiewPartsToAnalyze] = useState(true);

    // The API returns the detected location - we should show it
    const city = useSelector(getCity);
    const country = useSelector(getCountry);

    // let's get the days we need to display
    const daysToShow = days.filter(day => {
        // get the days according to the settings
        let partsToUseInPrediction = getPartsToUseInPrediction(day, useNightPartsInPredictions);

        return discardDaysWithTooFiewPartsToAnalyze
            ? partsToUseInPrediction.length >= 4 // The reasonable amount is the half of the possible stats
            : partsToUseInPrediction.length >= 1; // The minimum is 1 slice of the temp. There can be zero slices if we ingore nights and all the slices are night slices
    });

    // getting the page of days data
    function getPage(page: number): IDay[] {
        const skip = page * pageSize;
        const take = pageSize;
        return daysToShow.slice(skip, skip + take);
    }

    // let's get the current page to show it
    const currentPageData = getPage(currentPage);

    // let's get the next page to be able to determine should we allow to move next
    const nextPageData = getPage(currentPage + 1);

    // can we move prev or next
    const enablePrevPage = currentPage > 0;
    const enableNextPage = nextPageData.length > 0;

    // the selected card (the one we should show the details for)
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    // let's get the selected day
    let selectedDay: IDay | undefined;
    if (selectedCard) {
        selectedDay = days.find(d => d.date === selectedCard);
    } else {
        selectedDay = undefined;
    }

    return (
        <div className={classes.root} style={{
            width: mediumOrMore ? `${theme.breakpoints.values.md}px` : "100%",
            marginLeft: "auto",
            marginRight: "auto"
        }}>

            <Grid container spacing={1} style={{ padding: "20px" }}>
                <Grid item xs={12}>
                    <Grid container justify="center" alignItems="center" direction="column">
                        <Grid item>
                            <Typography variant="h4">
                                The weather for {`${city}, ${country}`}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Link onClick={() => {
                                dispatch(forecastSlice.actions.clearQuery(null));
                            }}>change</Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Temperature
                        isFahrenheit={isFahrenheit}
                        onTemperatureModeChanged={newIsFahrenheit => {
                            setIsFahrenheit(newIsFahrenheit);
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Pager
                        enablePrevPage={enablePrevPage}
                        enableNextPage={enableNextPage}
                        page={currentPage}
                        onPageChanged={newPage => {
                            setCurrentPage(newPage);
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DaysList
                        useNightPartsInPredictions={useNightPartsInPredictions}
                        selectedCard={selectedCard}
                        onSelectCard={newCardDate => {
                            setSelectedCard(newCardDate);
                        }}
                        isFahrenheit={isFahrenheit}
                        days={currentPageData}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DayDetails
                        day={selectedDay}
                        isFahrenheit={isFahrenheit}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item>
                            <Settings
                                useNightPartsInPredictions={useNightPartsInPredictions}
                                onUseNightPartsInPredictionsChanged={newValue => {
                                    setUseNightPartsInPredictions(newValue);
                                    setCurrentPage(0);
                                    setSelectedCard(null);
                                }}
                                discardDaysWithTooFiewPartsToAnalyze={discardDaysWithTooFiewPartsToAnalyze}
                                onDiscardDaysWithTooFiewPartsToAnalyzeChanged={newValue => {
                                    setDiscardDaysWithTooFiewPartsToAnalyze(newValue);
                                    setCurrentPage(0);
                                    setSelectedCard(null);
                                }}
                            />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    );
}

export default Forecast;
