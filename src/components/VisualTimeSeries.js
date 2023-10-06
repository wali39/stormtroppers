import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
// import DatenHour from './components/DatenHour';
import DateComponent from './DateComponent';
import Form from 'react-bootstrap/Form';
const API_URL = "https://storm-troopers-api-v1-production.up.railway.app/api/v1/bar/records"

const VisualTimeSeries = () => {

    const [chartData, SetChartData] = useState([]);
    const [chartCategory, SetChartCategory] = useState([]);
    const [selectedOption, setSelectedOption] = useState(0);
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    }
    const [keyArr, setKeyArr] = useState([])
    const [dataArr, setDataArr] = useState([])
    const categories = [];
    for (let i = 1; i <= 24; i++) categories.push(i);
    const options = {

        series: [{
            name: 'Geomagnetic parameters',
            data: dataArr[selectedOption]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            markers: {
                size: "1px"
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    columnWidth: "10%",
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                // enabled: true,
                formatter: function (val) {
                    return val.toFixed(2);
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: categories,

                position: 'bottom',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {

                },

            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + "%";
                    }
                }

            },
            title: {
                text: '',
                floating: true,
                offsetY: 50,
                align: 'center',
                style: {
                    color: '#444'
                }
            }
        },



    }
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

        fetch(`${API_URL}?${queryString}`)
            .then((response) => {

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseData) => {

                const data = responseData.records;
                let key_arr = [];
                let data_arr = [];
                for (const key in data) {
                    key_arr.push(key);
                    data_arr.push(data[key]);
                }
                setKeyArr(key_arr);
                setDataArr(data_arr);
        

            })
            .catch((error) => {
                console.error('Error fetching data:', error);


            });


    }, [selectedDate])


    return (
        <div>
            <DateComponent selectedDate={selectedDate} handleDateChange={handleDateChange} />
            <label style={{ marginTop: "5px", marginBottom: "5px" }} >Select Geomegnetic parameters</label>
            <Form.Select aria-label="" onChange={handleSelectChange} value={selectedOption} >


                {keyArr.map((item, index) => (<option value={index} key={index} >{item}</option>))}




            </Form.Select>
            <ReactApexChart options={options.options} series={options.series} type="line" />

        </div>
    )
}

export default VisualTimeSeries
