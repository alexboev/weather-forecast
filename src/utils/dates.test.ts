import { DateTime } from "luxon";
import { DAYTIME_HOUR_END, DAYTIME_HOUR_START, ERROR_TIMESTAMP_IS_NULL, ERROR_TIMEZONE_IS_NULL, UnixDateTime } from "./dates";

describe("Datetime wrapper", () => {
    test("throws if no timestamp is provided", () => {
        let a = 1620658800;

        expect(() =>{
            new UnixDateTime(<any>null, 4);
        }).toThrow();
    });

    test("throws a 'No timestamp' error if no timestamp is provided", () => {
        let a = 1620658800;

        expect(() =>{
            new UnixDateTime(<any>null, 4);
        }).toThrowError(ERROR_TIMESTAMP_IS_NULL);
    });

    const unixTimeStamp = 1620658800;

    test("throws if no timezone is provided", () => {
        expect(() =>{
            new UnixDateTime(unixTimeStamp, <any>null);
        }).toThrow();
    });

    test("throws a 'No timezone' error if no timezone is provided", () => {
        expect(() =>{
            new UnixDateTime(unixTimeStamp, <any>null);
        }).toThrowError(ERROR_TIMEZONE_IS_NULL);
    });

    const TEST_DATE = "2017-05-15";

    const TEST_ZONES = {
        UTC_PLUS: { asString: "UTC+4", asNumber: 4 },
        UTC_MINUS: { asString: "UTC-4", asNumber: -4 },
        UTC_ZERO: { asString: "UTC+0", asNumber: 0 },
    };

    const TEST_TIMES = {
        DAY_START: `0${DAYTIME_HOUR_START}:00:00`,
        DAY_MIDDLE: "14:00:00",
        DAY_END: `${DAYTIME_HOUR_END - 1}:00:00`,
        NIGHT: `${DAYTIME_HOUR_END + 1}:00:00`
    }

    function getUTCTestDateSeconds(time: string, zone: string): number {
        
        return DateTime
            .fromISO(`${TEST_DATE}T${time}`, { zone: zone })
            .toSeconds();
    }

    function DoTimeZoneRangeTest(
        timeZoneDescription: string,
        timeZone: { asString: string, asNumber: number }
    ) {
        const dayTimeStart = getUTCTestDateSeconds(TEST_TIMES.DAY_START, timeZone.asString);
        const dayTimeMiddle = getUTCTestDateSeconds(TEST_TIMES.DAY_MIDDLE, timeZone.asString);
        const dayTimeEnd = getUTCTestDateSeconds(TEST_TIMES.DAY_END, timeZone.asString);
        const nightTime = getUTCTestDateSeconds(TEST_TIMES.NIGHT, timeZone.asString);

        describe(`Inside ${timeZoneDescription} day times are being detected as`, () => {
            test("Day time beginning is being detected as day time", () => {
                expect(new UnixDateTime(dayTimeStart, timeZone.asNumber).isDayTime()).toBe(true);
            });

            test("Day time middle is being detected as day time", () => {
                expect(new UnixDateTime(dayTimeMiddle, timeZone.asNumber).isDayTime()).toBe(true);
            });

            test("Day time ending is being detected as day time", () => {
                expect(new UnixDateTime(dayTimeEnd, timeZone.asNumber).isDayTime()).toBe(true);
            });

            test("Night time is being detected as night time", () => {
                expect(new UnixDateTime(nightTime, timeZone.asNumber).isDayTime()).toBe(false);
            });
        });
    }

    DoTimeZoneRangeTest("UTC-plus", TEST_ZONES.UTC_PLUS);
    DoTimeZoneRangeTest("UTC-minus", TEST_ZONES.UTC_MINUS);
    DoTimeZoneRangeTest("UTC-zero", TEST_ZONES.UTC_ZERO);

    test("The same date with different times is considered as the same date", () => {
        let timeStampA = DateTime.fromISO("2017-05-15T11:05:45", { zone: "UTC+4" }).toSeconds();
        let timeStampB = DateTime.fromISO("2017-05-15T13:54:03", { zone: "UTC+4" }).toSeconds();

        let dateWithNoTimeA = new UnixDateTime(timeStampA, 4).getDateWithoutTime().getSeconds();
        let dateWithNoTimeB = new UnixDateTime(timeStampB, 4).getDateWithoutTime().getSeconds();

        expect(dateWithNoTimeA).toEqual(dateWithNoTimeB);
    });

    test("The different dates are considered as not equal", () => {
        let timeStampA = DateTime.fromISO("2017-05-15T11:05:45", { zone: "UTC+4" }).toSeconds();
        let timeStampB = DateTime.fromISO("2017-05-17T13:54:03", { zone: "UTC+4" }).toSeconds();

        let dateWithNoTimeA = new UnixDateTime(timeStampA, 4).getDateWithoutTime().getSeconds();
        let dateWithNoTimeB = new UnixDateTime(timeStampB, 4).getDateWithoutTime().getSeconds();

        expect(dateWithNoTimeA).not.toEqual(dateWithNoTimeB);
    });

    test("The 'date without time' is being returned without time", () => {
        let timeStampA = DateTime.fromISO("2017-05-15T11:05:45", { zone: "UTC+4" }).toSeconds();
        let timeStampB = DateTime.fromISO("2017-05-15T00:00:00", { zone: "UTC+4" }).toSeconds();

        let dateWithNoTimeA = new UnixDateTime(timeStampA, 4).getDateWithoutTime().getSeconds();
        let dateWithNoTimeB = new UnixDateTime(timeStampB, 4).getDateWithoutTime().getSeconds();

        expect(dateWithNoTimeA).toEqual(dateWithNoTimeB);
    });

    test("Date format should be printed as 'dd.MMM.yy'", () => {
        let timestamp = DateTime.fromISO("2017-05-15T11:05:45", { zone: "UTC+4" }).toSeconds();
        expect(new UnixDateTime(timestamp, 4).getDisplayText()).toEqual("15 May 17");
    });

    test("Time format should be printed as 'HH:mm'", () => {
        let timestamp = DateTime.fromISO("2017-05-15T11:05:45", { zone: "UTC+4" }).toSeconds();
        expect(new UnixDateTime(timestamp, 4).getTimeDisplayText()).toEqual("11:05");
    });

    test("Wrapper should return correct timestamp in seconds", () => {
        let timestamp = DateTime.fromISO("2017-05-15T11:05:45", { zone: "UTC+4" }).toSeconds();
        expect(new UnixDateTime(timestamp, 4).getSeconds()).toEqual(timestamp);
    });
})

