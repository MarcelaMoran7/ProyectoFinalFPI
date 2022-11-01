<template>
  <q-page class="flex flex-center">
    <h4>Detalle</h4>
    {{$route.params.idArticulo}}

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArticuloPage'
})
</script>
