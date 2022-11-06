<template>
  <fieldset>

    <legend>PRECIO</legend>

    <q-input filled bottom-slots v-model="text" label="Ingrese el precio" label-color="yellow-9" counter :dense="dense">
      <template v-slot:prepend>
        <q-icon name="las la-dollar-sign" />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click="text = ''" class="cursor-pointer" />
      </template>

      <template v-slot:hint>
        Field hint
      </template>
      </q-input>

  </fieldset>
</template>

<script>
</script>
