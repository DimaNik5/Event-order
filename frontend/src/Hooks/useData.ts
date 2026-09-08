
import { fetchComments, fetchEvents, fetchPages } from "@/Api/FetchEvent";
import { fetchSpec } from "@/Api/FetchSpec";
import { addUserToEvent, changeRoleUser, createEvent, delUserFromEvent, deleteUser, fetchAuth, fetchMe, fetchUnusers, fetchUserSpec, fetchUsers, fetchUsersOfEvent, login, logup, sentComment, updateEvent, updateMe, updatePage, updateSpecMe } from "@/Api/FetchUser";
import { GetType } from "@/Constants/Types/GetType";
import { Roles } from "@/Constants/Types/RoleType";
import { SetType } from "@/Constants/Types/SetType";
import { Event } from "@/Models/Common/Event";
import { EventSimple } from "@/Models/Common/EventSimple";
import { Page } from "@/Models/Common/Page";
import { PagesOfEvent } from "@/Models/Common/PagesOfEvent";
import { Specialisation } from "@/Models/Common/Specialisation";
import { User } from "@/Models/Common/User";
import { UserIn } from "@/Models/Common/UserIn";
import { Mutation, UseMutationResult, UseQueryResult, skipToken, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function checkQuery<TData = unknown>(query: UseQueryResult<TData>): UseQueryResult<TData> {
    if(query.isFetching || (query.data && !query.isStale)) return query;
    query.refetch();
    return query;
}

export default function useData(){

    const [id, setId] = useState<number>(0);

    const authQuery = useQuery({
        queryKey: ['auth'],
        queryFn: fetchAuth,
    });

    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // useEffect(() => {
    //     setIsAuthenticated(authQuery.data?.isValid ?? false);
    // }, [authQuery.data?.isValid]);

    const meQuery = useQuery<User>({
        queryKey: ['me'],
        queryFn: fetchMe,
        enabled: false,
    });
    const usersQuery = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: fetchUsers,
        enabled: false,
    });
    const unusersQuery = useQuery({
        queryKey: ['unusers'],
        queryFn: fetchUnusers,
        enabled: false,
    });
    const specQuery = useQuery<Specialisation[]>({
        queryKey: ['spec'],
        queryFn: fetchSpec,
        enabled: false,
    });
    const eventsQuery = useQuery<Event[]>({
        queryKey: ['events'],
        queryFn: fetchEvents,
        enabled: false,
    });
    const pagesQuery = useQuery<PagesOfEvent>({
        queryKey: ['pages', id],
        queryFn: id && id > 0  ? () => fetchPages(id) : skipToken,
        enabled: false,
    });
    const commentsQuery = useQuery({
        queryKey: ['comments', id],
        queryFn: id && id > 0  ? () => fetchComments(id) : skipToken,
        enabled: false,
    });
    const userOfEventQuery = useQuery<number[]>({
        queryKey: ['usersOfEvent', id],
        queryFn: id && id > 0 ? () => fetchUsersOfEvent(id) : skipToken,
        enabled: false,
    });

    const getData: Record<GetType, () => ReturnType<typeof useQuery>> = {
        'me': (): UseQueryResult<User> => checkQuery<User>(meQuery),
        'users': (): UseQueryResult<User[]> => checkQuery<User[]>(usersQuery),
        'unusers': () => checkQuery(unusersQuery),
        'spec': (): UseQueryResult<Specialisation[]> => checkQuery<Specialisation[]>(specQuery),
        'events': (): UseQueryResult<Event[]> => checkQuery<Event[]>(eventsQuery),
        'pages': (): UseQueryResult<PagesOfEvent> => checkQuery<PagesOfEvent>(pagesQuery),
        'comments': () => checkQuery(commentsQuery),
        'usersOfEvent': (): UseQueryResult<number[]> => checkQuery<number[]>(userOfEventQuery)
    }

    
    const queryClient = useQueryClient();

    const meMutation = useMutation({
        mutationFn: (data: User) => updateMe(data),
        onSuccess: () => {
            // После успешного обновления помечаем данные как устаревшие
            queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });
    const loginMutation = useMutation({
        mutationFn: (data: UserIn) => login(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
        },
    });
    const logupMutation = useMutation({
        mutationFn: (data: UserIn) => logup(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
        },
    });
    const userDelMutation = useMutation({
        mutationFn: (data: number) => deleteUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
    const userChangeRole = useMutation({
        mutationFn: (data: {id: number, role: Roles}) => changeRoleUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
    const meSpecMutation = useMutation({
        mutationFn: (data: number[]) => updateSpecMe(data),
        onSuccess: () => {
            // После успешного обновления помечаем данные как устаревшие
            queryClient.invalidateQueries({ queryKey: ['me'] });
        },
    });
    const createEventMutation = useMutation({
        mutationFn: (data: EventSimple) => createEvent(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });
    const updateEventMutation = useMutation({
        mutationFn: (data: Event) => updateEvent(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });
    const updatePageMutation = useMutation({
        mutationFn: (data: Page) => updatePage(data, id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });
    const delUserFromEventMutation = useMutation({
        mutationFn: (data: {id_event: number, id_user: number}) => delUserFromEvent(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usersOfEvents'] });
        },
    });
    const addUserToEventMutation = useMutation({
        mutationFn: (data: {id_event: number, id_user: number}) => addUserToEvent(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usersOfEvents'] });
        },
    });
    const sentCommentMutation = useMutation({
        mutationFn: (data: {id_event: number, comment: string}) => sentComment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['usersOfEvents'] });
        },
    });

    const setData: Record<SetType, UseMutationResult<any, Error, any>> = {
        'me': meMutation,
        'specMe': meSpecMutation,
        'login': loginMutation,
        'logup': logupMutation,
        'deleteUser' : userDelMutation,
        'changeRoleUser' : userChangeRole,
        'createEvent': createEventMutation,
        'updateEvent': updateEventMutation,
        'updatePage': updatePageMutation,
        'delUserFromEvent': delUserFromEventMutation,
        'addUserToEvent': delUserFromEventMutation,
        'sent': sentCommentMutation
    };

    return {
        // isAuthenticated,
        getData,
        setId,
        setData
    }
}

