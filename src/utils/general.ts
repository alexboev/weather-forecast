export function hasValue(value: any): boolean{
    return value != undefined && value != null;
}

export function hasText(value: string): boolean {
    return hasValue(value) && value.trim().length > 0;
}

export function getOneMostFrequent<TValue>(items: TValue[]): TValue | null {
    let counts = new Map<TValue, number>();
    items.forEach(item => {
        let count: number = <number>counts.get(<TValue>item);
        if (!hasValue(count)){
           count = 0;
        }

        count++;
        counts.set(<TValue>item, count);
    });

    let mostAppearedCount = 0;
    let mostAppearedItem: TValue | null = null;
    counts.forEach((count, item) => {
        if (count > mostAppearedCount){
            mostAppearedItem = item;
            mostAppearedCount = count;
        }
    });

    return mostAppearedItem;
}