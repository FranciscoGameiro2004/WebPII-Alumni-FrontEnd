<template>
  <div>
    <h1>{{ post.title }}</h1>
    <h5>
      Made by <b>{{ post["User.name"] }}</b> | {{ post.dateTime }}
    </h5>
    <hr />
        {{ post.body }}
    <hr />
    <card>
      <div class="d-flex justify-content-between">
        <div>
          <h4 class="card-title">Comments</h4>
          <div v-if="userStore.getUserLogged">
            <base-input
          type="text"
          label="Add Comment"
          class="col-md-12"
          v-model="commentInput"
        >
        </base-input>
        <base-button
                round
                icon
                type="success"
                @click="sendComment(commentInput)"
              >
                <i class="tim-icons icon-send"></i>
              </base-button>
          </div>
          <card v-for="comment of comments" :key="comment.id">
            <div class="d-flex justify-content-between">
              <div>
                <h5>
                  <b>{{ comment.User.name }}</b> | {{ comment.dateTime }}
                </h5>
                <p>{{ comment.body }}</p>
              </div>
            </div>
          </card>
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
      userStore: useUserStore(),
      commentInput: ''
    };
  },
  computed: {
    post() {
      return this.postStore.getFound;
    },
    comments(){
        return this.postStore.getFoundComments
    }
  },
  mounted() {
    this.postStore.fetchPublication(this.$route.params.id);
    this.postStore.fetchComments(this.$route.params.id);
    this.commentInput = ''
  },
  methods: {
    sendComment(comment) {
        try {
            this.postStore.addComment(+this.$route.params.id, comment)
        } catch (error) {
            console.log(error.message);
        }
    }
  },
};
</script>

<style></style>
