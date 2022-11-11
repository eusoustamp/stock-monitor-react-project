import React, {useState} from 'react';
import './App.css';
import Home from './components/home/Home';
import Stocks from './components/stock/Stocks';
import PriceHistory from './components/price_history/PriceHistory';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  const [stockName, setStockName] = useState("");
    return (
        <div>
        <Router>
            {/* <Link exact to = '/'>Home</Link>
            <Link to = '/stocks'>Stocks</Link> */}
            
            <Switch>
              <Route exact path="/" >
                  <Home />
              </Route>
              <Route path="/stocks">
                  <Stocks setStockName = {setStockName}/>
              </Route>
              <Route path="/price-history">
                  <PriceHistory stockName = {stockName}/>
              </Route>
            </Switch>
        </Router>
        </div>
        // <div><Home/></div>
    );
}

export default App;
