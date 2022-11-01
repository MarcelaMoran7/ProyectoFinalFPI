<template>
  <div>
    <div class="row">

    </div>
    <div class="row q-ma-md">
      <q-card class="my-card col-md-3 col-6 q-pa-sm"
      v-for="(item,key) in 12" :key="key">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">

      <q-card-section>
        <div class="text-h6">$132</div>
        Samsung J6, Pantalla de 5.5
        64GB, 2GB Ram, Color Negro
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="yellow-5">Detalles</q-btn>
      </q-card-actions>
    </q-card>

    </div>
  </div>

</template>

<script setup>
</script>
