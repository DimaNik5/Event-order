import api from "./Axios";

export const fetchEvents = async () => {
    const response = await api.get('/events');
    return response.data;
}

export const fetchPages = async (id: number) => {
    const response = await api.get(`/events/${id}/pages`);
    return response.data;
}
export const fetchComments = async (id: number) => {
    const response = await api.get(`/events/${id}/comments`);
    return response.data;
}