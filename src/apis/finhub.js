import axios from "axios";

const token ="cqb90phr01qvu0jv0rv0cqb90phr01qvu0jv0rvg"
export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token:token
    }
});