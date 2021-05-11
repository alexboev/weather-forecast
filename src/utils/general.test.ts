import { getOneMostFrequent } from "./general";

describe("general utils", () => {
    test("return most frequent whith single most frequent item", () => {
        let items = ["item 1", "item 2", "item 3", "item 2"];

        expect(getOneMostFrequent(items)).toEqual("item 2");
    });

    test("return first most frequent whith multiple most frequent items", () => {
        let items = ["item 1", "item 2", "item 3", "item 2", "item 1"];

        expect(getOneMostFrequent(items)).toEqual("item 1");
    });

    test("return first most frequent from distinct values", () => {
        let items = ["item 1", "item 2", "item 3"];

        expect(getOneMostFrequent(items)).toEqual("item 1");
    });
});