import { defineStore } from 'pinia';
import * as api from '@/api/api.js';
//import { get } from 'mongoose';

const USERS_BASE_URL = 'http://127.0.0.1:3000';
const resources = `users`;

//http://127.0.0.1:3000/users/?search=&nationality=&page=0&limit=5

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    foundUserID: 0,
    foundUser: {},
    searchUser: {},
    //userLogged data
    userLogged: null,
    userLoggedFollowing: [],
		userToken: '',
    userNotifications: [],
    type: 'normal',
    degrees: [],
    jobs: []
  }),
  getters: {
    getUsers: (state) => state.users.data,
    getUserPageInfo: (state) => state.users.pagination,
    getUser: (state) => state.foundUser,
    getFollowingUsers: (state) => state.userLoggedFollowing,
    getSearchUser: (state) => state.searchUser,
    //userLogged getters
    getUserLogged: (state) => state.userLogged,
    getUserToken: (state) => state.userToken,
    getNotifications: (state) => state.userNotifications,
    getUserType: (state) => state.type,
    getUserDegrees: (state) => state.degrees,
    getUserJobs: (state) => state.jobs
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
        const data = await api.get(USERS_BASE_URL, `${resources}/${id}`);console.log(data);
        this.foundUser = data; // Armazena os dados no estado
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },
    async searchUserById(id){
      console.log('Fetching user by id');
      try {
        const data = await api.get(USERS_BASE_URL, `${resources}/${id}`);console.log(data);
        this.searchUser = data; // Armazena os dados no estado
      } catch (error) {
        console.error('Error searching user:', error);
        throw error;
      }
    },
    async fetchNotifications(){
      try {
        console.log('noti');
        console.log(this.getUserToken);
        const data = await api.get(USERS_BASE_URL, `notifications?readState=0`, this.getUserToken);console.log(data);
        this.userNotifications = data.notifications; // Armazena os dados no estado
      } catch (error) {
        console.log('Error fetching noti:', error);
        //throw error;
      }
    },
    async checkNotification(id){
      try {
        console.log('check noti');
        console.log(this.getUserToken);
        const data = await api.patch(USERS_BASE_URL, `notifications/${id}`, {}, this.getUserToken);console.log(data);
        this.fetchNotifications()
      } catch (error) {
        console.log('Error update noti:', error);
        //throw error;
      }
    },
    async postLogin(data) {
			try {
        console.log('Fetching token'); //console.table(data)
			const resData = await api.post(USERS_BASE_URL, `${resources}/login`, data); console.log(resData)
			this.userLogged = resData.userToLogin; console.log(this.userLogged);
			this.userToken = resData.accessToken; console.log(this.userToken);
      this.type = resData.userToLogin.type;
      await this.fetchNotifications()
      } catch (error) {
        console.log(error.message)
      }
		},
    async fetchUserDegreesAndJobs(id){
      console.log('Fetch Degrees and Jobs');
      console.log(this.getUserToken);
      const data = await api.get(USERS_BASE_URL, `users/${id}`);console.log(data);
      console.log(data);
      this.degrees = data.degrees
      this.jobs = data.jobs
    },
    async updateUserInfo(id, updateInfo){
      console.log('Update info');
      console.log(this.getUserToken);
      console.log(updateInfo);
      const data = await api.patch(USERS_BASE_URL, `users/${id}`, updateInfo, this.getUserToken);
      console.log(data);
    },
    async addDegreeToUser(degreeToAdd){
      console.log('Update info');
      console.log(this.getUserToken);
      console.log(degreeToAdd);
      const data = await api.patch(USERS_BASE_URL, `users/me`, {
        addJobs: [],
        removeJobs: [],
        addDegrees: [degreeToAdd],
        removeDegrees: []
      }, this.getUserToken);
      console.log(data);
    },
    async updateDegreeToUser(degreeToUpdate, originalDegree){
      console.log('Update info');
      console.log(this.getUserToken);
      console.log(degreeToUpdate);
      const data = await api.patch(USERS_BASE_URL, `users/me`, {
        addJobs: [],
        removeJobs: [],
        addDegrees: [degreeToUpdate],
        removeDegrees: [originalDegree]
      }, this.getUserToken);
      console.log(data);
    },
    async removeDegreeToUser(degreeToRemove){
      console.log('Update info');
      console.log(this.getUserToken);
      console.log(degreeToRemove);
      const data = await api.patch(USERS_BASE_URL, `users/me`, {
        addJobs: [],
        removeJobs: [],
        addDegrees: [],
        removeDegrees: [degreeToRemove]
      }, this.getUserToken);
      console.log(data);
    },
    async fetchUserFollowing(id){
      try {
        console.log('Fetch following users');
      console.log(id);
      const data = await api.get(USERS_BASE_URL, `users/${id}`);
      this.userLoggedFollowing = data.following
      } catch (error) {
        
      }
    },
    async followUser(id, followId){
      try {
        console.log('follow');
        console.log(this.getUserToken);
        const data = await api.post(USERS_BASE_URL, `users/${followId}/followers`, {id: followId}, this.getUserToken);console.log(data);
        this.fetchUserFollowing()
      } catch (error) {
        console.log('Error update noti:', error);
        //throw error;
      }
    },
    async unfollowUser(id, unfollowId){
      try {
        console.log('unfollow');
        console.log(this.getUserToken);
        const data = await api.del(USERS_BASE_URL, `users/${unfollowId}/followers`, {id: unfollowId}, this.getUserToken);console.log(data);
        this.fetchUserFollowing()
      } catch (error) {
        console.log('Error update noti:', error);
        //throw error;
      }
    }
  }
});