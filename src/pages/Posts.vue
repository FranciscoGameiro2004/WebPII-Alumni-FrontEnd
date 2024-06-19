<template>
  <div>
    <card>
      <div v-if="usersStore.getUserLogged">
        <h5 class="card-title">Add Post</h5>
        <base-input
          type="text"
          label="Title"
          placeholder="Lorem Ipsium Sit Amet"
          class="col-md-16"
          v-model="titleInput"
        >
        </base-input>
        <base-input label="Body">
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="bodyInput"
          ></textarea>
        </base-input>
        <base-button
          round
          icon
          type="success"
          @click="sendPost()"
        >
          <i class="tim-icons icon-send"></i>
        </base-button>
      </div>
      <div class="d-flex justify-content-between">
        <h4 class="card-title">Publications</h4>
      </div>
      <div class="d-flex justify-content-between">
        <base-input
          type="text"
          label="Search"
          placeholder="Search"
          class="col-md-6"
        >
        </base-input>
      </div>

      <div>
        <div v-for="post of postsList" :key="post.id" @click="alert(post.id)">
          <card class="d-flex flex-row col-md-6">
            <router-link :to="{ name: 'publication', params: { id: post.id } }">
              <div class="d-flex justify-content-between">
                <div>
                  <h1 class="card-title">
                    {{ post.title }}
                  </h1>
                  <h5 class="card-title">From {{ post["User.username"] }}</h5>
                </div>
              </div>
            </router-link>
          </card>
        </div>
        <div>
          <p>No posts found.</p>
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { usePublicationsStore } from "../stores/posts";
import { useUserStore } from '../stores/users';
export default {
  data() {
    return {
      postStore: usePublicationsStore(),
      usersStore: useUserStore(),
      titleInput: "",
      bodyInput: "",
    };
  },
  computed: {
    postsList() {
      return this.postStore.getAll;
    },
  },
  methods: {
    sendPost(){
        this.postStore.addPost(this.titleInput, this.bodyInput)
    }
  },
  mounted() {
    this.postStore.fetchAllPublications();
  },
};
</script>

<style></style>
