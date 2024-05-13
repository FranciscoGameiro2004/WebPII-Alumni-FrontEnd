<template>
    <div>
      <h1>Welcome!</h1>
      <div class="col-md-5 pr-md-1">
          <base-input
            label="Email"
            placeholder=""
            v-model="emailInput"
          >
          </base-input>
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
          <base-input
            label="Confirm Password"
            placeholder=""
            v-model="confInput"
            useAsPassword="True"
          >
          </base-input>
          <base-button slot="footer" type="primary" fill>Register</base-button>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    //! Ainda não está funcional!
    //Nota: Acrescentar elementos!!!!
      data() {
          return {
              emailInput: '',
              userInput: '',
              passInput: '',
              confinput: ''
          }
      },
  }
  </script>
  
  <style>
  
  </style>