  watch: {
    // Observando mudanças em userLogged e userToken
    'userStore.getUserLogged': {
      handler(newVal, oldVal) {
        console.log('getUserLogged mudou de', oldVal, 'para', newVal);
      },
      immediate: true,
    },
    'userStore.getUserToken': {
      handler(newVal, oldVal) {
        console.log('getUserToken mudou de', oldVal, 'para', newVal);
      },
      immediate: true,
    },
  },