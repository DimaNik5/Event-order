import api from "./Axios";

export const fetchSpec = async () => {
    const response = await api.get('/spec');
    return response.data;
}