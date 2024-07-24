import { BrowserRouter, Route, Routes } from "react-router-dom";
//todo import components:start
import StockDetailPage from "./pages/StockDetailPage";
import StockOverViewPage from "./pages/StockOverViewPage";
//todo import components:end

function App() {
    return (
        <main className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/TradingApp" element={<StockOverViewPage />} />
                    <Route path="/TradingApp/detail/:symbol" element={<StockDetailPage />} />
                    <Route path="*" element={
                        <h1>404 Not Found</h1>
                    } />
                </Routes>
            </BrowserRouter>
        </main>
    );
}

export default App;
