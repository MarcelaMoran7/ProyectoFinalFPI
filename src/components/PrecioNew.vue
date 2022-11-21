<template>
  <fieldset>
    <legend>PRECIO</legend>
    <q-input ref="preciosRef" type="number" bottom-slots v-model="preciosModel" label="Ingrese el precio" label-color="yellow-9"  :dense="dense" :rules="[val => !!val || 'Campo requerido']" >
      <template v-slot:prepend>
        <q-icon name="las la-dollar-sign" />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click="text = ''" class="cursor-pointer" />
      </template>
    </q-input>
    <q-btn label="PRUEBA" @click="reseteando"></q-btn>
  </fieldset>
</template>

<script>

import { ref } from 'vue'

export default {
  name: 'PrecioNew',

  setup () {
    const preciosRef = ref(null)
    const precios = ref(null)
    return {

      validPrecio () {
        return preciosRef.value.validate()
      },

      preciosModel: ref(''),

      preciosRef,
      precios,

      reset () {
        preciosRef.value.resetValidation()
      }

    }
  },

  methods: {
    reseteando () {
      console.log('entree')
      this.reset()
    },
    obteniendoDatos () {
      return this.preciosModel
    },

    validandoDatos () {
      this.preciosRef.value.validate()
    }

  }
}

</script>
