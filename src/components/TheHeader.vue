<script >
// imports
;
import CartWidget from './CartWidget.vue';
import { userAuthStore } from '@/stores/UserAuthStore.'
import { mapState, mapWritableState, mapActions } from 'pinia';
export default {
  components: { CartWidget },
  computed: {
    // ...mapState(userAuthStore, ['username'])
    // ...mapState(userAuthStore,{
    //   user:(store)=>`Hello ${store.username}`
    // })
    //The above is not writable to make it writable use mapWritableState
    ...mapWritableState(userAuthStore, {
      user: 'username'
    })
  },
  methods: {
    // ...mapActions(userAuthStore, ['visitTwitterProfile'])
    ...mapActions(userAuthStore, {
      toTwitter: 'visitTwitterProfile'
    })
  }
}
</script>

<template>
  <header class="flex justify-between p-6 mb-10 items-center"
    style="background-image: url('/images/double-bubble-outline.png')">
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <div>
      <span class="mr-5" @click="toTwitter">{{ user }}</span>
      <CartWidget class="inline-block" />
    </div>

  </header>
</template>