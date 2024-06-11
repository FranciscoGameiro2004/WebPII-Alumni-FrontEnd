import { defineStore } from 'pinia';
import * as api from '@/api/api.js';
import { get } from 'mongoose';

const USERS_BASE_URL = 'http://127.0.0.1:3000';
const resources = `users`;

//http://127.0.0.1:3000/users/?search=&nationality=&page=0&limit=5

export const useUsersStore = defineStore('user', {
  state: () => ({
    users: [],
    foundUserID: 0,
    foundUser: {},
    userLogged: {}
  }),
  getters: {
    getUsers: (state) => state.users.data,
    getUserPageInfo: (state) => state.users.pagination,
    getUser: (state) => state.foundUser,
    getUserLogged: (state) => state.userLogged
  },
  actions: {
    async fetchUsers(search='', page='0', limit='5') {
      console.log('Fetching users');
      try {
        const data = await api.get(USERS_BASE_URL, `users`);console.log(data);
        data = data.filter(user => user.type != "admin")
        this.users = data; // Armazena os dados no estado
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    },
    async fetchUserById(id){
      console.log('Fetching user by id');
      try {
        this.foundUserID = id
        const data = await api.get(USERS_BASE_URL, `users/${id}`);console.log(data);
        this.foundUser = data; // Armazena os dados no estado
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },
  }
});