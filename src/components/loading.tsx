import React, { useEffect, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { forecastSlice, getLoadingError, getLoadingStatus, getQuery, loadForecast } from '../store/store';
import { makeStyles, Theme, createStyles, TextField, Button, Box, Typography, CircularProgress } from '@material-ui/core';
import { hasText } from '../utils/general';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

const Loading = (props: {

}) => {
    const dispatch = useDispatch();

    /** The status of the data loading */
    const loadingStatus = useSelector(getLoadingStatus);

    /** The error message if the query has failed */
    const loadingError = useSelector(getLoadingError);

    // The tests for different query states
    const isIdle = loadingStatus === "idle";
    const isError = loadingStatus === "failed";
    const isLoading = loadingStatus === "loading";
    const isLoaded = loadingStatus === "succeeded";

    const classes = useStyles();

    /** The confirmed query text */
    const query = useSelector(getQuery);

    /** The text typed in the search text field */
    const [queryInput, setQueryInput] = useState<string>("Munich"); // we use Munich as the demo city

    const queryInputRef: any = useRef(null);

    // Let's set the focus on text and select it to help user to easely change it
    useEffect(() => {
        if (queryInputRef.current){
            queryInputRef.current.focus();
            queryInputRef.current.select();
        }
    }, []);
    
    useEffect(() => {
        // if there is a query text which was confirmed we should try to load the data
        if (isIdle && hasText(query)) {
            dispatch(loadForecast(query))
        }
    }, [loadingStatus, dispatch, query]);

    /** confirms the entered text as query input */
    const confirmTheQueryText = () => {
        dispatch(forecastSlice.actions.setQuery({
            query: queryInput
        }));
    };

    return (
        <Grid container spacing={2} direction="column" justify="center" alignItems="center">
            <Grid item xs={12}>
                {isError && <></>}
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField 
                        inputRef={queryInputRef}
                        label="Location" 
                        variant="outlined" 
                        size="small"
                        value={queryInput}
                        onChange={event => {
                            setQueryInput(event.target.value);
                        }}
                        onKeyPress={event =>{
                            // We should search when the user hits the Enter key
                            if (event.key == "Enter"){
                                event.preventDefault();

                                // let's confirm the search text so we have access to it while loading
                                confirmTheQueryText();
                            }
                        }}
                        />
                        <Button 
                            variant="contained"
                            
                            color="primary"
                            onClick={() =>{
                                confirmTheQueryText();
                            }}
                            >
                            Search
                        </Button>
                </form>
            </Grid>
            <Grid item xs={12}>
                {isError && <Typography variant="h5" color="error">
                    Error: {loadingError}
                </Typography>}
                {isLoading && <CircularProgress color="secondary"></CircularProgress>}
            </Grid>
        </Grid>
    );
};

export default Loading;
