<template>
  <card type="user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="#">
        <img class="avatar" :src="user.profilePicLink" :alt="user.profilePicLink" />
        <h5 class="title">{{ user.name }}</h5>
        <h6 class="title">{{ user.username }}</h6>
      </a>
      <p class="description">
        {{ user.title }}
      </p>
      <p class="description">
        <!-- <b>LVL {{ user.level }}</b> -->
      </p>
    </div>
    <p></p>
    <div v-if="!ownProfile && logged" class="d-flex justify-content-center">
      <base-button @click="$emit('followingUser')" type="primary" v-if="following.some(targetUser => +targetUser.userId != +user.userId)">Follow</base-button>
      <base-button @click="$emit('unfollowingUser')" simple type="primary" v-else>Unfollow</base-button>
    </div>
    <!-- <div slot="footer" class="button-container">
      <base-button icon round class="btn-facebook">
        <i class="fab fa-facebook"></i>
      </base-button>
      <base-button icon round class="btn-twitter">
        <i class="fab fa-twitter"></i>
      </base-button>
      <base-button icon round class="btn-google">
        <i class="fab fa-google-plus"></i>
      </base-button>
    </div> -->

    <div slot="footer" v-if="ownProfile" class="d-flex flex-row-reverse">
        <base-button round icon type="warning">
          <router-link :to="{hash: '#editProfile'}">
            <i class="tim-icons icon-pencil text-white"></i>
          </router-link>
        </base-button>
    </div>
  </card>
</template>
<script>
import { useUserStore } from '../../stores/users';
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      },
    },
    ownProfile: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    logged: {
      type: Object,
      default: () => {
        return {};
      },
    },
    following: {
      type: Array,
      default: () => {
        return [];
      },
    },
  }
};
</script>
<style></style>
