import { useState, useEffect } from "react";
import finhub from "../apis/finhub";
import { useNavigate } from "react-router-dom";
import InProcess from "./InProcess";

//todo icons import:start
import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";
import { useGlobalContext } from "../context";
//todo icons import:end

export default () => {
    const navigate = useNavigate();

    const { watchList, removeStock } = useGlobalContext();

    const [stock, setStock] = useState();
    const [loading, setLoading] = useState(true);

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
            setStock(finalData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    //!use effects: start
    useEffect(() => {
        fetchData();
    }, [watchList]);
    //!use effects: end

    return loading === true ? (
        <InProcess text="LOADING..." />
    ) : (
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
                                <tr
                                    key={ele.symbol}
                                    className="table-row"
                                    onClick={() => {
                                        navigate(`/detail/${ele.symbol}`);
                                    }}
                                    style={{ cursor: "pointer" }}
                                >
                                    <th scope="row">{ele.symbol}</th>
                                    <td>{ele.data.c}</td>
                                    <td
                                        className={
                                            ele.data.d > 0
                                                ? "text-success "
                                                : "text-danger "
                                        }
                                    >
                                        {ele.data.d}
                                        {ele.data.d > 0 ? (
                                            <BsCaretUpFill />
                                        ) : (
                                            <BsCaretDownFill />
                                        )}
                                    </td>
                                    <td
                                        className={
                                            ele.data.dp > 0
                                                ? "text-success "
                                                : "text-danger "
                                        }
                                    >
                                        {ele.data.dp}
                                        {ele.data.dp > 0 ? (
                                            <BsCaretUpFill />
                                        ) : (
                                            <BsCaretDownFill />
                                        )}
                                    </td>
                                    <td>{ele.data.h}</td>
                                    <td>{ele.data.l}</td>
                                    <td>{ele.data.o}</td>
                                    <td>
                                        {ele.data.pc}
                                        <button
                                            className="btn btn-danger ml-3 btn-sm delete-button d-inline-block"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeStock(ele.symbol);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
