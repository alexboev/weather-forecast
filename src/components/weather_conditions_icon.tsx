import React from 'react';

/** The weather icon */
const WeatherConditionsIcon = (props: {
    /** the icon name */
    icon: string | null
}) => {

    return (
        <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}></img>
    );
};

export default WeatherConditionsIcon;