import { DateTime } from "luxon";
import { hasValue } from "./general";

// The errors whick protect our wrapper from uninitialized values
export const ERROR_TIMESTAMP_IS_NULL = "Unix timestamp is requred but is null or undefined";
export const ERROR_TIMEZONE_IS_NULL = "Timezone is requred but is null or undefined";

/*
    The task requires that we show the average day's temperature. But the data arrives in about 8 slices 
    so we have to calculate an average value. The issue here is that it is reasonable to
    assume that the user wants to know the DAY TIME TEMPERATURE and it's likely that he is not 
    interested in night temperatures. If we account for the night temperatures the average value will 
    be generally colder due to the colder air at night. So we have implemented the ability to ignore 
    night temperatures during the calculation if the user wants to do so. But how can we determine is it
    a day or night? We have to do some guess here. Let's use some reasonable restrictions here base on
    our experience.
*/
export const DAYTIME_HOUR_START = 7;
export const DAYTIME_HOUR_END = 21;

/** A datetime operations wrapper to simplify app's logic*/
export class UnixDateTime {
    constructor(
        private unixTimeStamp: number,
        private timeZoneOffsetInHours: number
        ){

        if (!hasValue(unixTimeStamp)){
            throw Error(ERROR_TIMESTAMP_IS_NULL);
        }

        if (!hasValue(timeZoneOffsetInHours)){
            throw Error(ERROR_TIMEZONE_IS_NULL);
        }
    }

    /** get the date object with a specific timezone */
    private getDateTimeInZone(): DateTime {
        let timeZoneSuffix = "+0";
        if (this.timeZoneOffsetInHours > 0){
            timeZoneSuffix = "+" + Math.abs(this.timeZoneOffsetInHours);
        }
        else if (this.timeZoneOffsetInHours < 0){
            timeZoneSuffix = "-" + Math.abs(this.timeZoneOffsetInHours);
        }

        return DateTime
        .fromSeconds(this.unixTimeStamp)
        .setZone(`UTC${timeZoneSuffix}`);
    }

    /** Is our datetime represents day time or night ? */
    isDayTime(): boolean
    {
        // For reasoning please see the comment above (regarding the DAYTIME_HOUR_START and DAYTIME_HOUR_END constants)
        let dateTime = this.getDateTimeInZone();
        let currentHour = dateTime.hour;
        return currentHour >= DAYTIME_HOUR_START && currentHour < DAYTIME_HOUR_END;
    }

    /** The user-friendly date label text */
    getDisplayText(): string{
        return this.getDateTimeInZone().toFormat("dd MMM yy");
    }

    /** The user-friendly time label text */
    getTimeDisplayText(): string{
        return this.getDateTimeInZone().toFormat("HH:mm");
    }

    /** Return the date component of datetime which is helpful to determine the similarity of dates */
    getDateWithoutTime(): UnixDateTime {
        let dateTime = this.getDateTimeInZone();
        let date = dateTime.startOf("day");
        let dateSeconds = date.toSeconds();
        return new UnixDateTime(dateSeconds, this.timeZoneOffsetInHours);
    }

    /** return the date in the form of seconds to help to store dates, compare them etc. */
    getSeconds(): number {
        return this.getDateTimeInZone().toSeconds();
    }

    
}
