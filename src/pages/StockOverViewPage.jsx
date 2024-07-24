//todo import components:start
import AutoComplete from "../components/AutoComplete";
import StockList from "../components/StockList";
//todo import components:end

export default () => (
    <div>
        <h1 style={{textAlign:"center"}}>Let's Trade</h1>
        <AutoComplete />
        <StockList />
    </div>
);
;