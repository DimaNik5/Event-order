import { User } from "@/Models/Common/User";
import api from "./Axios";
import { UserIn } from "@/Models/Common/UserIn";
import { Auth } from "@/Models/Auth/Auth";
import { AxiosResponse } from "axios";
import { Roles } from "@/Constants/Types/RoleType";
import { EventSimple } from "@/Models/Common/EventSimple";
import { Event } from "@/Models/Common/Event";
import { Page } from "@/Models/Common/Page";

export const fetchUsers = async () => {
    const response = await api.get('/user/all');
    return response.data;
}

export const fetchUsersOfEvent = async (id: number) => {
    const response = await api.get(`/event/${id}/users`);
    return response.data;
}

export const fetchUnusers = async () => {
    const response = await api.get('/unusers');
    return response.data;
}

export const fetchMe = async () : Promise<User> => {
    const response = await api.get('/user/me');
    return response.data;
}

export const fetchUserSpec = async (id: number) => {
    const response = await api.get(`/user/${id}/spec`);
    return response.data;
}

export const fetchAuth =  async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return {isValid: false};
    }
    try {
        await api.get('/auth/verify');
        return;
    } catch (error) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            localStorage.removeItem('token');
            return {isValid: false};
        }
        try {
            const response: AxiosResponse<Auth> = await api.post('/auth/refresh', {
                refreshToken: refreshToken,
            });
            const t = response.data.token;
            const rt = response.data.refresh_token;
            localStorage.setItem('token', t);
            localStorage.setItem('refreshToken', rt);
            return {isValid: true};
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return {isValid: false};
        }
    }
}



export const updateMe = async (data: User) => {
    const response = await api.post('/me/update', data);
    return response.data;
}

export const updateSpecMe = async (data: number[]) => {
    const response = await api.post('/me/update/spec', data);
    return response.data;
}

export const login = async (data: UserIn) => {
    const response = await api.post('/user/login', data);
    return response.data;
}

export const logup = async (data: UserIn) => {
    const response = await api.post('/user/create', data);
    return response.data;
}

export const deleteUser = async (id: number) => {
    const response = await api.delete(`/user/${id}`);
    return response.data;
}

export const changeRoleUser = async (data: {id: number, role: Roles}) => {
    const response = await api.post('/user/role', data);
    return response.data;
}

export const createEvent = async (data: EventSimple) => {
    const response = await api.post('/events/create', data);
    return response.data;
}

export const updateEvent = async (data: Event) => {
    const response = await api.post('/events/update', data);
    return response.data;
}

export const updatePage = async (data: Page, id: number) => {
    const response = await api.post(`/events/${id}/page/update`, data);
    return response.data;
}

export const delUserFromEvent = async (data: {id_event: number, id_user: number}) => {
    const response = await api.post('/events/users/delete', data);
    return response.data;
}

export const addUserToEvent = async (data: {id_event: number, id_user: number}) => {
    const response = await api.post('/events/users/add', data);
    return response.data;
}

export const sentComment = async (data: {id_event: number, comment: string}) => {
    const response = await api.post('/events/comment', data);
    return response.data;
}