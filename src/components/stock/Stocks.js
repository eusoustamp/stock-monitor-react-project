import React, {useState} from 'react';
import SearchBar from './SearchBar';
import StockListTable from './StockListTable';
import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';

function Stocks(props) {
    const [symbolQuery, setSymbolQuery] = useState("");
    const [industrySelect, setIndustrySelect] = useState({ value: "All" });

    return (
        <div>
            <NavBar />
            <SearchBar className="d-flex justify-content-center" setSymbolQuery={setSymbolQuery} industrySelect={industrySelect} setIndustrySelect={setIndustrySelect} />
            <StockListTable symbolQuery={symbolQuery} industrySelect={industrySelect} setStockName={props.setStockName} />
            <Footer />
        </div>
    );
}

export default Stocks;