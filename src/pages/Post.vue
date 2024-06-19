<template>
 <div>
    <h1>{{ post.title }}</h1>
    <h5>Made by <b>{{ post['User.name'] }}</b> | {{ post.dateTime }}</h5>
    <hr>
    <pre>
        {{ post.body }}
    </pre>
    <hr>
 </div>
</template>

<script>
import { usePublicationsStore } from '../stores/posts'
export default {
    data() {
        return {
            postStore: usePublicationsStore()
        }
    },
computed: {
    post() {
        return this.postStore.getFound
    }
},
mounted () {
    this.postStore.fetchPublication(this.$route.params.id);
},
}
</script>

<style>

</style>