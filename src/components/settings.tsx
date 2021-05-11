import { FormControl, FormLabel, FormGroup, FormControlLabel, Switch, FormHelperText } from '@material-ui/core';
import React from 'react';

/** The settings control UI */
const Settings = (props: {
    /** Should we consider the night temperatures */
    useNightPartsInPredictions: boolean,
    onUseNightPartsInPredictionsChanged: (newValue: boolean) => void,
    /** Should we consider the days with too few data to analyze */
    discardDaysWithTooFiewPartsToAnalyze: boolean,
    onDiscardDaysWithTooFiewPartsToAnalyzeChanged: (newValue: boolean) => void,
}) => {
    return <FormControl component="fieldset">
    <FormLabel component="legend">Settings</FormLabel>
    <FormGroup>
      <FormControlLabel
        control={<Switch 
            checked={props.useNightPartsInPredictions} 
            onChange={(event) => {
                props.onUseNightPartsInPredictionsChanged(event.target.checked);
            }}
             />}
        label="Consider night hours when calculating the day weather"
      />
      <FormControlLabel
        control={<Switch 
            checked={props.discardDaysWithTooFiewPartsToAnalyze} 
            onChange={(event) => {
                props.onDiscardDaysWithTooFiewPartsToAnalyzeChanged(event.target.checked);
            }}
             />}
        label="Discard days with too fiew parts to analyze"
      />
    </FormGroup>
    <FormHelperText>Change these settings to fine tune predictions</FormHelperText>
  </FormControl>;
};

export default Settings;