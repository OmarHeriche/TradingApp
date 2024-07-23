import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [watchList, setWatchList] = useState(
        localStorage.getItem("watchList")?.split(",") || [
            "AAPL",
            "MSFT",
            "GOOGL",
        ]
    );

    const addStock = (symbol) => {
        if (watchList.includes(symbol)) return;
        setWatchList([...watchList, symbol]);
    };
    const removeStock = (symbol) => {
        setWatchList(watchList.filter((ele) => ele !== symbol));
    };

    useEffect(() => {
        localStorage.setItem("watchList", watchList);
    }, [watchList]);

    return (
        <AppContext.Provider
            value={{
                watchList,
                addStock,
                removeStock,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
