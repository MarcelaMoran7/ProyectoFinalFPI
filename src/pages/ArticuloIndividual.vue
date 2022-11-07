<template lang="">
  <div class="row">
    <h6>{{idarticulo}}</h6>

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
