import { useEffect, useState } from "react";
import finhub from "../apis/finhub";

export default ({ symbol }) => {
    const [stockInfos, setStockInfos] = useState();
    const fetchData = async () => {
        try {
            const response = await finhub.get(`/stock/profile2`, {
                params: {
                    symbol,
                },
            });
            setStockInfos(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [symbol]);
    return (
        <div>
            {stockInfos && (
                <div className="row rouned bg-white shadow-sm p-4 mt-5">
                    <div className="col">
                        <div>
                            <span className="fw-bold">
                                name : {stockInfos.name}
                            </span>
                        </div>
                        <div>
                            <span className="fw-bold">
                                country : {stockInfos.country}
                            </span>
                        </div>
                        <div>
                            <span className="fw-bold">
                                ticket : {stockInfos.ticker}
                            </span>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <span className="fw-bold">
                                exchange : {stockInfos.exchange}
                            </span>
                        </div>
                        <div>
                            <span className="fw-bold">
                                industry : {stockInfos.finnhubIndustry}
                            </span>
                        </div>
                        <div>
                            <span className="fw-bold">
                                IPO : {stockInfos.ipo}
                            </span>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <span className="fw-bold">
                                marketCap : {stockInfos.marketCapitalization}
                            </span>
                        </div>
                        <div>
                            <span className="fw-bold">shares : 
                                {stockInfos.shareOutstanding}
                            </span>
                        </div>
                        <div>
                            <span className="fw-bold">url : 
                                <a href={stockInfos.weburl}>{stockInfos.weburl}</a>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
