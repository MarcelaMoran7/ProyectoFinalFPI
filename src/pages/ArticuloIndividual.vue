<template lang="">
  <div class="row">
    <h1>{{idarticulo}}</h1>

  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const idarticulo = ref('')

onMounted(() => {
  idarticulo.value = route.params.idArticulo
})

</script>
<style lang="">

</style>
