<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";
import { useProductStore } from './stores/ProductStore'
import { useCartStore } from './stores/CartStore'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue';
const productStore = useProductStore()
//If you wish to use destructuring,you will have to import StoreToRefs from pinia, this  will make the store to be reactive
//const { products } = storeToRefs(useProductStore())
//console.log(products)
const cartStore = useCartStore()
let history = reactive([])
const future = reactive([])
const doingHistory = ref(false)
history.push(JSON.stringify(cartStore.$state))
const redo = () => {
  const latestState = future.pop()
  if (!latestState) return;
  doingHistory.value = true
  history.push(latestState)
  cartStore.$state = JSON.parse(latestState)
  doingHistory.value = false
}
const undo = () => {
  if (history.length === 1) return
  doingHistory.value = true
  future.push(history.pop())
  cartStore.$state = JSON.parse(history.at(-1))
  doingHistory.value = false
}
cartStore.$subscribe((mutation, state) => {
  console.log({ mutation })
  console.log({ state })
  if (!doingHistory.value) {
    history.push(JSON.stringify(state))
  }
})
cartStore.$onAction(({ name, store, args, after, onError }) => {
  if (name === 'addItems') {
    after(() => {
      console.log(args[0])
    })
  }
})

productStore.fill()

</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="undo">Undo</AppButton>
      <AppButton @click="redo" class="ml-2">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.id" :product="product"
        @add-to-cart="cartStore.addItems($event, product)" />
    </ul>
  </div>
</template>
