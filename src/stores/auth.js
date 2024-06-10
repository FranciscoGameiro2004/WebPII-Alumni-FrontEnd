import { defineStore } from 'pinia';
import * as api from '@/api/api.js';

const TOKEN_BASE_URL = 'http://127.0.0.1:3000';
const resources = `login`;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authToken: ''
    }),
    getters: {
        getToken: (state) => state.authToken
    },
    actions: {
        async fetchToken(data) {
            console.log('Fetching token'); //console.table(data)
            //const token = await api.post(TOKEN_BASE_URL, resources, data); console.log(token)
        }
    }
})