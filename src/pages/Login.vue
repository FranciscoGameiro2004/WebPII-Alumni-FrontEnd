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
          useAsPassword="True"
        >
        </base-input>
        <base-button slot="footer" type="primary" fill>Login</base-button>
      </div>
  </div>
</template>

<script>
//! Ainda não está funcional!
export default {
    data() {
        return {
            userInput: '',
            passInput: ''
        }
    },
}
</script>

<style>

</style>