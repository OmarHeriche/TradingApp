import { useState, useEffect } from "react";
import finhub from "../apis/finhub";

//todo icons import:start
import { BsCaretUpFill ,BsCaretDownFill} from "react-icons/bs";
//todo icons import:end

export default () => {
    const [watchList, setWatchList] = useState(["GOOGL", "AAPL", "MSFT"]);
    const [stock, setStock] = useState();

    const fetchData = async () => {
        try {
            const response = await Promise.all(
                watchList.map(async (symbol) => {
                    return await finhub.get("/quote", {
                        params: {
                            symbol,
                        },
                    });
                })
            );
            const finalData = response.map((ele) => {
                const symbol = ele.config.params.symbol;
                const data = ele.data;
                return { symbol, data };
            });
            console.log(finalData);
            setStock(finalData);
        } catch (error) {
            console.log(error);
        }
    };

    //!use effects: start
    useEffect(() => {
        fetchData();
    }, []);
    //!use effects: end

    return (
        <div>
            <table className="table hover mt-5">
                <thead style={{ color: "rgb(79,89,102)" }}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last</th>
                        <th scope="col">Chg</th>
                        <th scope="col">Chg‰</th>
                        <th scope="col">High</th>
                        <th scope="col">Low</th>
                        <th scope="col">Open</th>
                        <th scope="col">Pclose</th>
                    </tr>
                </thead>
                <tbody>
                    {stock &&
                        stock.map((ele) => {
                            return (
                                <tr key={ele.symbol} className="table-row">
                                    <th scope="row">{ele.symbol}</th>
                                    <td>{ele.data.c}</td>
                                    <td
                                        className={
                                            ele.data.d > 0
                                                ? "text-success "
                                                : "text-danger "
                                        }
                                    >
                                        {ele.data.d}{ele.data.d > 0 ? <BsCaretUpFill/> : <BsCaretDownFill/>}
                                    </td>
                                    <td
                                        className={
                                            ele.data.dp > 0
                                                ? "text-success "
                                                : "text-danger "
                                        }
                                    >
                                        {ele.data.dp}{ele.data.dp > 0 ? <BsCaretUpFill/> : <BsCaretDownFill/>}
                                    </td>
                                    <td>{ele.data.h}</td>
                                    <td>{ele.data.l}</td>
                                    <td>{ele.data.o}</td>
                                    <td>{ele.data.pc}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
