<script>
import { useUserStore } from "../stores/users"
export default {
  data() {
    return {
      userStore: useUserStore(),
      userInput: '',
      passInput: ''
    }
  },
  methods: {
    async login() {
      try {
        console.clear();
      console.log("userInput: " + this.userInput)
      console.log("passInput: " + this.passInput)

      let data = {
        username: this.userInput,
        password:  this.passInput
      }; console.log(data)

      await this.userStore.postLogin(data)

      this.$router.push({ name: 'dashboard'})
      } catch (error) {
        //! Temporário
        alert(error.message)
      }
    }
  }
}
</script>

<template>
  <div>
    <h1>Hello again!</h1>
    <div class="col-md-5 pr-md-1">
      <base-input
        label="Username"
        placeholder=""
        v-model="userInput"
      >
      </base-input>
      <base-input
        label="Password"
        placeholder=""
        v-model="passInput"
        :useAsPassword="true"
      >
      </base-input>
      <base-button slot="footer" type="primary" fill @click="login">Login</base-button>
    </div>
  </div>
</template>

<style>

</style>
