import React, { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Line } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';

function Title(props) {
    return (
        <div className="d-flex justify-content-center">
            <h1>Closing Prices of {props.queryName}</h1>
        </div>
    );
}

function Chart(props) {

    const tableData = props.tableData.slice().reverse();

    const labelData = tableData.map((data) => {
        return data.date;
    });
    const chartData = tableData.map((data) => {
        return data.close;
    })
    const data = {
        labels: labelData,
        datasets: [{
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            label: "Closing Price",
            data: chartData
        }]
    }
    const options = {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                  display: true,
                  text: 'Date'
                }
              },
            y: {
                display: true,
                title: {
                  display: true,
                  text: 'Price'
                }
              }
        }
    }

    return (
        <div className="mx-1">
            <Line data={data} options={options} />
        </div>
    );
}

function Calendar(props) {
    const startDate = props.startDate;
    const setStartDate = props.setStartDate;

    return (
        <div className="d-flex justify-content-center">
            <label>Viewing Price History from </label>
            <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={startDate}
                onChange={(startDate) => {
                    setStartDate(new Date(startDate));
                }}
            />
        </div>
    );
}

function PriceTable(props) {
    const [priceData, setPriceData] = useState([]);
    const columns = [
        { headerName: "Date", field: "date" , sortable: true,resizable: true, flex:1},
        { headerName: "Open", field: "open" ,sortable: true,resizable: true, flex:1},
        { headerName: "High", field: "high" ,sortable: true,resizable: true, flex:1},
        { headerName: "Low", field: "low" ,sortable: true,resizable: true, flex:1},
        { headerName: "Close", field: "close" ,sortable: true,resizable: true, flex:1},
        { headerName: "Volume", field: "volume" ,sortable: true,resizable: true, flex:1}
    ]

    useEffect(() => {
        if (priceData.length === 0) {
            const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${props.queryText}?timeseries=100&apikey=e87c48ae46897543d860f6950bf203d7`
            fetch(url)
                .then((res) => res.json())
                .catch((e) => {
                    console.log(e);
                    })
                .then((details) => {
                    console.log(details)
                    return details.historical.map((detail) => {
                        return {
                            date: detail.date.substring(0, 10),
                            open: detail.open,
                            high: detail.high,
                            low: detail.low,
                            close: detail.close,
                            volume: detail.volume
                        }
                    })
                })
                .then((tableData) => {
                    setPriceData(tableData);
                    props.setTableData(tableData);
                    props.setStartDate(new Date(tableData[tableData.length - 1].date));
                })
        } else {
            const filteredResult = priceData.filter((detail) => {
                if (new Date(detail.date).getTime() >= props.startDate.getTime()) {
                    return {
                        date: detail.date,
                        open: detail.open,
                        high: detail.high,
                        low: detail.low,
                        close: detail.close,
                        volume: detail.volume
                    }
                }
            });
            props.setTableData(filteredResult);
        }

    }, [props.startDate]);

    return (
        <div className="ag-theme-balham mx-auto" style={{height: "50vmin", width: "100%"}}>
            <AgGridReact
                columnDefs={columns}
                rowData={props.tableData}
                pagination={true}
                paginationPageSize={20}
            />
        </div>
    );
}

function PriceHistory(props) {
    const queryName = props.stockName;
    const useQuery = () => new URLSearchParams(useLocation().search);
    const queryText = useQuery().get("symbol");
    const [startDate, setStartDate] = useState();
    const [tableData, setTableData] = useState([]);
    
    return (
        <div>
            <NavBar />
            <Title queryName={queryName} />
            <Calendar startDate={startDate} setStartDate={setStartDate} />
            <Chart tableData={tableData} />
            <PriceTable queryText={queryText} tableData={tableData} setTableData={setTableData} startDate={startDate} setStartDate={setStartDate} />
            <Footer/>
        </div>
    );
}

export default PriceHistory;