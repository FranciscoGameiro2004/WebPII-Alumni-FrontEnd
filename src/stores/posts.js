import { defineStore } from 'pinia';
import * as api from '@/api/api.js';
import { useUserStore } from './users';

const POSTS_BASE_URL = 'http://127.0.0.1:3000';
const resources = `publishes`;

const userStore = useUserStore()

export const usePublicationsStore = defineStore('publication', {
  state: () => ({
    publications: [],
    allPublications: [],
    publication: {},
    comments: [],
  }),
  getters: {
    getPublications: (state) => state.publications,
    getAll: (state) => state.allPublications,
    getFound: (state) => state.publication,
    getFoundComments: (state) => state.comments,
  },
  actions: {
    async fetchPublications(page=0, limit=5) {
      console.log('Fetching publications');
      try {
        const data = await api.get(POSTS_BASE_URL, `${resources}?limit=${limit}&page=${page}`); //console.log(data);
        this.publications = data; //console.log(this.publications) // Armazena os dados no estado
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
    },
    async fetchAllPublications() {
      console.log('Fetching publications');
      try {
        const data = await api.get(POSTS_BASE_URL, `${resources}?limit=${999999}&page=${0}`); //console.log(data);
        this.allPublications = data.data; //console.log(this.publications) // Armazena os dados no estado
      } catch (error) {
        console.error('Error fetching every post:', error);
        throw error;
      }
    },
    async fetchPublication(id) {
        console.log('Fetching publication');
        try {
          const data = await api.get(POSTS_BASE_URL, `${resources}/${id}`); //console.log(data);
          this.publication = data; //console.log(this.publications) // Armazena os dados no estado
        } catch (error) {
          console.error('Error fetching a post:', error);
          throw error;
        }
      },
      async fetchComments(id) {
        console.log('Fetching publication');
        try {
          const data = await api.get(POSTS_BASE_URL, `${resources}/${id}/comments`); //console.log(data);
          this.comments = data; //console.log(this.publications) // Armazena os dados no estado
        } catch (error) {
          console.error('Error fetching a post:', error);
          throw error;
        }
      },
      async addComment(id, comment){
        try {
          console.log('follow');
          console.log(this.getUserToken);
          const data = await api.post(POSTS_BASE_URL, `${resources}/${id}/comments`, {comment: comment}, userStore.getUserToken);console.log(data);
          this.fetchComments(id)
        } catch (error) {
          console.log('Error update noti:', error);
          //throw error;
        }
      },
  }
});
