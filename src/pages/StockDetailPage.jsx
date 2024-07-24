import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyChart from "../components/MyChart.jsx";
import axios from "axios";
import StockInfos from "../components/StockInfos.jsx";

export default () => {
    const { symbol } = useParams();
    const [chartData, setChartData] = useState([]);

    function dateToSeconds(dateString) {
        const date = new Date(dateString);
        const milliseconds = date.getTime();
        const seconds = Math.floor(milliseconds / 1000);
        return seconds;
    }

    const formatedData = (data) => {
        const formatedData = Object.keys(data).map((key) => {
            return {
                x: dateToSeconds(key),
                y: data[key]["1. open"],
            };
        });
        return formatedData;
    };

    const fetchData = async () => {
        try {
            const responses = await Promise.all([
                axios.get(
                    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=8I2OKP760GNJY71R`
                ),
                axios.get(
                    `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=8I2OKP760GNJY71R`
                ),
                axios.get(
                    `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=8I2OKP760GNJY71R`
                ),
            ]);
            let dailyData = responses[0].data["Time Series (Daily)"];
            let weeklyData = responses[1].data["Weekly Time Series"];
            let monthlyData = responses[2].data["Monthly Time Series"];

            dailyData = formatedData(dailyData);
            weeklyData = formatedData(weeklyData);
            monthlyData = formatedData(monthlyData);

            setChartData({
                day: dailyData,
                week: weeklyData,
                month: monthlyData,
            });
            console.log(dailyData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [symbol]);

    return (
        <div>
            {chartData && (
                <div>
                    <MyChart chartData={chartData} symbol={symbol} />
                    <StockInfos symbol={symbol} />
                </div>
            )}
        </div>
    );
};
