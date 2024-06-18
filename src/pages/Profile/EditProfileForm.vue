<!-- eslint-disable vue/no-mutating-props -->
<template>
  <card>
    <h5 slot="header" class="title">Edit Profile</h5>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input
          label="Name"
          v-model="editProfileInputs.name"
          placeholder="Name"
        >
        </base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input
          label="Username"
          v-model="editProfileInputs.username"
          placeholder="Username"
        >
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pl-md-1">
        <base-input
          label="Email address"
          type="email"
          placeholder="Email here"
          v-model="editProfileInputs.email"
        >
        </base-input>
      </div>
      <div class="col-md-6 pr-md-1">
        <base-input
          label="Password"
          placeholder="123456 is a bad example of a password"
          v-model="editProfileInputs.password"
        >
        </base-input>
      </div>
    </div>

    <!-- <div class="row">
      <div class="col-md-12">
        <base-input
          label="Address"
          v-model="model.address"
          placeholder="Home Address"
        >
        </base-input>
      </div>
    </div> -->
    <!-- <div class="row">
      <div class="col-md-4 pr-md-1">
        <base-input label="City" v-model="model.city" placeholder="City">
        </base-input>
      </div>
      <div class="col-md-4 px-md-1">
        <base-input
          label="Country"
          v-model="model.country"
          placeholder="Country"
        >
        </base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input label="Postal Code" placeholder="ZIP Code"> </base-input>
      </div>
    </div> -->
    <div class="row">
      <div class="col-md-8">
        <base-input>
          <label>Privacy</label>
          <base-checkbox v-model="editProfileInputs.showDegrees">
            Show academic carrer to everyone
          </base-checkbox>
          <base-checkbox v-model="editProfileInputs.showJobs">
            Show professional carrer to everyone
          </base-checkbox>
        </base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" @click="saveChanges" fill
      >Save</base-button
    >
  </card>
</template>
<script>
import { useUserStore } from "../../stores/users";
export default {
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      userStore: useUserStore(),
      editProfileInputs: {
        name: "John Doe",
        username: "johnD0e",
        email: "johnd0e",
        password: "",
        showDegrees: true,
        showJobs: true,
      },
    };
  },
  computed: {
    loggedUser() {
      return this.userStore.getUserLogged;
    },
    profileInfo() {
      return {
        name: this.loggedUser.name,
        username: this.loggedUser.username,
        email: this.loggedUser.email,
        showDegrees: this.loggedUser.consentDegrees,
        showJobs: this.loggedUser.consentJobs,
        id: this.loggedUser.id,
      };
    },
  },
  methods: {
    saveChanges() {
      this.userStore.updateUserInfo(this.profileInfo.id, {
        username: this.editProfileInputs.username,
        name: this.editProfileInputs.name,
        email: this.editProfileInputs.email,
        password: this.editProfileInputs.password,
        consentJobs: this.editProfileInputs.showJobs,
        consentDegrees: this.editProfileInputs.showDegrees,
      });
    },
  },
  mounted() {
    this.editProfileInputs.name = this.profileInfo.name;
    this.editProfileInputs.username = this.profileInfo.username;
    this.editProfileInputs.email = this.profileInfo.email;
    this.editProfileInputs.showDegrees = this.profileInfo.showDegrees;
    this.editProfileInputs.showJobs = this.profileInfo.showJobs;
  },
};
</script>
<style></style>
