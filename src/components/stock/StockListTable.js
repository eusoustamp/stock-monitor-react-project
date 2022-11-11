import React, {useState, useEffect} from 'react';
import { NavLink } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const url = "https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=e87c48ae46897543d860f6950bf203d7";

export default function StocksListTable(props) {
    const symbolQuery = props.symbolQuery;
    const industrySelect = props.industrySelect.value;
    const [stockData, setStockData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const columns = [
        {
            headerName: "Stock",
            field: "symbol",
            sortable: true,
            resizable: true,
            flex:1,
            cellRendererFramework: (params) => {
                return <NavLink to={`/price-history?symbol=${params.value}`} onClick={() => {
                    props.setStockName(params.data.name);
                }}> {params.value} </NavLink>
            }
        },
        { headerName: "Company Name", field: "name", sortable: true,resizable: true, flex:1 },
        { headerName: "Industry", field: "industry", sortable: true,resizable: true, flex:1 },
    ];

    useEffect(() => {
        if (stockData.length === 0) {
            fetch(url)
                .then((res) => res.json())
                .catch((e) => {
                    console.log(e);
                })
                .then((data) =>{ 
                    console.log(data)
                       return data.map(
                            (stock) => {
                                return {
                                    symbol: stock.symbol,
                                    name: stock.name,
                                    industry: stock.sector
                                }
                            }
                        )
                    }
                )
                .then((stocks) => {
                    setStockData(stocks);
                    setSearchResult(stocks);
                });
        } else {
            const filteredResult = stockData.filter((stock) => {
                
                if (stock.symbol.includes(symbolQuery.toUpperCase()) && industrySelect === "All") {
                    
                    return {
                        symbol: stock.symbol,
                        name: stock.name,
                        industry: stock.industry
                    }
                } else if (stock.symbol.includes(symbolQuery.toUpperCase()) && stock.industry === industrySelect) {
                    
                    return {
                        symbol: stock.symbol,
                        name: stock.name,
                        industry: stock.industry
                    }
                }
            });
            setSearchResult(filteredResult);
        }
    }, [symbolQuery, industrySelect]);

    return (
        <div className="ag-theme-alpine mx-auto" style={{height: "70vmin", width: "100%"}}>
            <AgGridReact
                columnDefs = {columns}
                rowData = {searchResult}
                pagination = {true}
                paginationPageSize = {20}
            />
        </div>
    );
}