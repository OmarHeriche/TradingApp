import React,{useContext,useState} from "react";

const AppContext = React.createContext();
const AppProvider = ({children})=>{

    const [watchList, setWatchList] = useState(["GOOGL", "AAPL", "MSFT"]);

    const addStock = (symbol) => {
        if(watchList.includes(symbol)) return;
        setWatchList([...watchList, symbol]);
    }
    const removeStock = (symbol) => {
        setWatchList(watchList.filter((ele)=>ele!==symbol));
    }

    return(
        <AppContext.Provider
            value={{
                watchList,
                addStock,
                removeStock
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = ()=>{
    return useContext(AppContext);
}

export {AppProvider, useGlobalContext};