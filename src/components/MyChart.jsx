import Chart from "react-apexcharts";
import { useState } from "react";

export default ({ chartData, symbol }) => {
    const { day, week, month } = chartData;
    const [time, setTime] = useState("day");

    const timeStamp = () => {
        switch (time) {
            case "day":
                return day;
            case "week":
                return week;
            case "month":
                return month;
            default:
                return day;
        }
    };


    const styleButton = (button) => {
        let baseStyle = "btn m-1";
        return button === time
            ? (baseStyle += " btn-primary")
            : (baseStyle += " btn-outline-primary");
    };

    // const color =
    //     timeStamp() && timeStamp()[0].y >= timeStamp()[timeStamp().length - 1].y
    //         ? "#2dd36f" //!green
    //         : "#f55656"; //!red

    const options = {
        // colors: [color],
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px",
            },
        },
        chart: {
            id: "basic-bar",
            animations: {
                speed: 800,
            },
        },
        xaxis: {
            type: "datetime",
            datetimeUTC: false,
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM",
            },
        },
    };

    const series = [
        {
            name: "candle",
            data: timeStamp(),
        },
    ];

    return (
        <div className="mt-5 p-4 bg-white shadow-sm">
            <Chart options={options} series={series} type="area" width="100%" />
            <div>
                <button
                    className={styleButton("day")}
                    onClick={() => {
                        setTime("day");
                    }}
                >
                    Day
                </button>
                <button
                    className={styleButton("week")}
                    onClick={() => {
                        setTime("week");
                    }}
                >
                    Week
                </button>
                <button
                    className={styleButton("month")}
                    onClick={() => {
                        setTime("month");
                    }}
                >
                    Month
                </button>
            </div>
        </div>
    );
}
