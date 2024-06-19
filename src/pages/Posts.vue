<template>
  <div>
    <card>
      <div class="d-flex justify-content-between">
        <h4 class="card-title">Events</h4>
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
export default {
  data() {
    return {
      postStore: usePublicationsStore(),
    };
  },
  computed: {
    postsList() {
      return this.postStore.getAll;
    },
  },
  methods: {
    toggleEdit() {
      this.edit = true;
    },
    toggleAdd() {
      this.edit = false;
      this.modals.newEvent = true;
    },
  },
  mounted() {
    this.postStore.fetchAllPublications();
  },
};
</script>

<style></style>
