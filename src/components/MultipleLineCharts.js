import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import DateComponent from './DateComponent';
const API_URL = "https://storm-troopers-api-v1-production.up.railway.app/api/v1/bar/records"
const MultipleLineCharts = () => {
    const [keyArr, setKeyArr] = useState([])
    const [dataArr, setDataArr] = useState([])
    const [chartData, setChartData] = useState([]);
    const categories = [];
    for (let i = 1; i <= 24; i++) categories.push(i);

    const [selectedDate, setSelectedDate] = useState(new Date("2022-01-01 00:00:00"));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const utcTimestamp = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));


    const timestamps = utcTimestamp.toJSON();
    const cleanedTimestamp = timestamps.substring(0, 10);
    useEffect(() => {
        const queryParams = {
            "timestamps": cleanedTimestamp
        };

        const queryString = new URLSearchParams(queryParams).toString();

        fetch(`${process.env.REACT_APP_API_URL}/api/v1/bar/records?${queryString}`)
            .then((response) => {

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseData) => {

                const records = responseData.records;
                let key_arr = [];
                let data_arr = [];
                let multiChartSeries = []
                for (const key in records) {
                    key_arr.push(key);
                    data_arr.push(records[key]);
                    const series_obj = {
                        name: key,
                        data: records[key]
                    };
                    multiChartSeries.push(series_obj)

                }
                setKeyArr(key_arr);
                setDataArr(data_arr);
                setChartData(multiChartSeries);
                console.log("multiseries", multiChartSeries)


            })
            .catch((error) => {
                console.error('Error fetching data:', error);


            });


    }, [selectedDate])

    const options = {
        chart: {
            id: 'multiple-line-chart',
            toolbar: {
                show: false,
            },

        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            categories: []
        },
        yaxis: {
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                }
            }
        }

    }

    return (

        <div className='text-center'>
            <DateComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />
            <ReactApexChart
                options={options}
                series={chartData}
                type="line"
                height={350}
            />
        </div>
    );
};

export default MultipleLineCharts;
