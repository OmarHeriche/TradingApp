import { useState, useEffect } from "react";
import finhub from "../apis/finhub";
import { useGlobalContext } from "../context";

export default () => {
    const [search, setSearch] = useState("");
    const [possibleWords, setPossibleWords] = useState([]);
    const { addStock } = useGlobalContext();

    const fetchData = async () => {
        try {
            const response = await finhub.get("/search", {
                params: {
                    q: search,
                },
            });
            console.log(response.data.result);
            setPossibleWords(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (search === "") {
            setPossibleWords([]);
            return;
        }
        fetchData();
    }, [search]);

    return (
        <div className="w-50 rounded mx-auto p-5">
            <div className="form-floating dropdown">
                <input
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder="Search"
                    autoComplete="off"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <label htmlFor="search">Search</label>
                <ul
                    className={
                        "dropdown-menu " +
                        (possibleWords.length === 0 ? "d-none" : "show")
                    }
                    style={{
                        maxHeight: "200px",
                        overflowY: "scroll",
                        width: "100%",
                        cursor: "pointer",
                    }}
                >
                    {possibleWords.map((word) => {
                        return (
                            <li key={word.symbol} 
                                onClick={() => {
                                    addStock(word.symbol);
                                    setSearch("");
                                }}
                            >
                                <a href="#" className="dropdown-item">
                                    {word.description}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
