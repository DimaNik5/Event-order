// api/axios.ts
import { tokenService } from '@/Utils/tokenService';
import axios from 'axios';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Интерсепторы для обработки ошибок
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

// Интерсептор запроса с исключениями
api.interceptors.request.use(
    (config) => {
        // Список публичных эндпоинтов
        const publicEndpoints = [
            '/user/login',
            '/user/create',
            '/user/refresh',
            '/user/logout',
            // '/user/me'
        ];
        
        // Проверяем, является ли запрос публичным
        const isPublicEndpoint = publicEndpoints.some(endpoint => 
            config.url?.includes(endpoint)
        );
        
        // Добавляем токен только для защищенных эндпоинтов
        if (!isPublicEndpoint) {
            const token = tokenService.getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

// Интерсептор ответа для сохранения токенов
api.interceptors.response.use(
    (response) => {
        if (response.data?.accessToken && response.data?.refreshToken) {
            tokenService.setTokens(
                response.data.accessToken,
                response.data.refreshToken
            );
        }
        return response;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Если получаем 401 и это не запрос на обновление токена
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = tokenService.getRefreshToken();
                if (refreshToken) {
                    // Запрос на обновление токена
                    const response = await axios.post('/api/user/refresh', {
                        refreshToken: refreshToken
                    });
                    
                    const { accessToken, refreshToken: newRefreshToken } = response.data;
                    
                    // Сохраняем новые токены
                    tokenService.setTokens(accessToken, newRefreshToken);
                    
                    // Повторяем оригинальный запрос с новым токеном
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Если не удалось обновить - выходим
                tokenService.clearTokens();
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;