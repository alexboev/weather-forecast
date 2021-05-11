import React from 'react';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

// The available temperature options
const Celsius = "Celsius";
const Fahrenheit = "Fahrenheit";

/** The temperature control UI */
const Temperature = (props: {
    /** should we calculate temperatures as Fahrenheit */
    isFahrenheit: boolean,
    /** The mode has changed */
    onTemperatureModeChanged: (isFahrenheit: boolean) => void
}) => {
    const theme = useTheme();
    const smallest = !useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Grid container direction="row" justify="space-around" alignItems="center">
            <Grid item>
                <RadioGroup 
                    row={!smallest} 
                        aria-label="temperature" 
                        name="temperature" 
                        value={props.isFahrenheit ? Fahrenheit : Celsius} 
                        onChange={event => {
                            props.onTemperatureModeChanged(event.target.value == Fahrenheit);
                        }}
                        >
                    <FormControlLabel value={Celsius} control={<Radio />} label="Celsius" />
                    <FormControlLabel value={Fahrenheit} control={<Radio />} label="Fahrenheit" />
                </RadioGroup>
            </Grid>
        </Grid>
    );
};

export default Temperature;