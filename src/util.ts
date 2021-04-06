import type { GenericMeasure, Measure, Unit, MeasureFormatter, UnitWithSymbols } from "safe-units";

export function stripUnit<T extends Unit>(v: Measure<T>, u: GenericMeasure<number, T>): number {
    if (!v) {
        return 0;
    }

    return v.div(u as any).value;
}

export function formatNumber(x: number): string {
    return x.toLocaleString("en-US", {
        useGrouping: false,
        maximumFractionDigits: 3,
    });
}

function formatSeconds(value: number) {
    const seconds = Math.floor(value % 60);
    value -= seconds;
    const minutes = Math.floor((value % 3600) / 60);
    value -= minutes * 60;
    const hours = Math.floor(value / 3600);

    if (hours > 0) {
        return hours + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")
    }

    return minutes + ":" + seconds.toString().padStart(2, "0")
}

export class SecondFormatter implements MeasureFormatter<number> {
    formatValue(value: number): string {
        return formatSeconds(value)
    }

    formatUnit(unit: UnitWithSymbols): string { return "" }
}

export class MinuteFormatter implements MeasureFormatter<number> {
    formatValue(value: number): string {
        return formatSeconds(value * 60)
    }

    formatUnit(unit: UnitWithSymbols): string { return "" }
}

export class MeterFormatter implements MeasureFormatter<number> {
    formatValue(value: number): string {
        if (value > 1000) {
            const km = value / 1000;
            return km.toLocaleString("en-US", {
                useGrouping: false,
                maximumFractionDigits: 2,
            }) + " km";
        }

        return Math.round(value).toString() + " m"
    }

    formatUnit(unit: UnitWithSymbols): string { return "" }
}

export function makeRoundedNumberFormatter(digits: number): MeasureFormatter<number> {
    function formatValue(value: number): string {
        return value.toLocaleString("en-US", {
            useGrouping: false,
            maximumFractionDigits: digits,
        });
    }
    return { formatValue }
}