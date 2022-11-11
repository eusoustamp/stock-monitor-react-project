import React, { useState } from 'react';

export default function SearchBar(props) {
    const [symbolQuery, setSymbolQuery] = useState("");

    return (
        <div className="d-lg-flex justify-content-center">
            <div className="my-2 d-flex justify-content-center">
                <label>Stock Symbol</label><br />
                <input className="mx-1" name="symbolQuery"  type="text" value={symbolQuery} onChange={
                    (e) => {
                        setSymbolQuery(e.target.value);
                    }
                } />
                <button className="btn btn-info" type="search" onClick={() => {
                    props.setSymbolQuery(symbolQuery);
                }}>Search</button>
            </div>
            <div className="my-2  ml-3 d-flex justify-content-center">
                <label>Stock Industry</label>
                <select className="mx-1" onChange={
                    (e) => {
                        props.setIndustrySelect({value: e.target.value});
                    }}>
                    <option value='All' label='All' />
                    <option value='Basic Materials' label='Basic Materials' />
                    <option value='Communication Services' label='Communication Services' />
                    <option value='Conglomerates' label='Conglomerates' />
                    <option value='Consumer Cyclical' label='Consumer Cyclical' />
                    <option value='Consumer Defensive' label='Consumer Defensive' />
                    <option value='Energy' label='Energy' />
                    <option value='Financial Services' label='Financial Services' />
                    <option value='Healthcare' label='Healthcare' />
                    <option value='Industrials' label='Industrials'/>
                    <option value='Industrial Goods' label='Industrial Goods' />
                    <option value='Real Estate' label='Real Estate' />
                    <option value='Technology' label='Technology' />
                    <option value='Utilities' label='Utilities' />
                </select>
            </div>
        </div>
    )
}