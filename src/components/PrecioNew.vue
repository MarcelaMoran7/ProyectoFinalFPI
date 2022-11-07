<template>
  <fieldset>

    <legend>PRECIO</legend>

    <q-input filled bottom-slots v-model="text" label="Ingrese el precio" label-color="yellow-9"  :dense="dense">
      <template v-slot:prepend>
        <q-icon name="las la-dollar-sign" />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click="text = ''" class="cursor-pointer" />
      </template>
      </q-input>

  </fieldset>
</template>

<script>
</script>
