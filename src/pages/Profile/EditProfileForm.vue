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
          <base-checkbox v-model="editProfileInputs.showDegrees"> Show academic carrer to everyone </base-checkbox>
          <base-checkbox v-model="editProfileInputs.showJobs"> Show professional carrer to everyone </base-checkbox>
        </base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" @click="saveChanges" fill>Save</base-button>
  </card>
</template>
<script>
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
      editProfileInputs: {
        name: 'John Doe',
        username: 'johnD0e',
        email: 'john.doe@email.com',
        showDegrees: true,
        showJobs: true,
      }
    }
  },
  methods: {
    saveChanges() {
      alert('CHANGE')
    }
  },
};
</script>
<style></style>
