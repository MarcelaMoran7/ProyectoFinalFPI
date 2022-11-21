<template>
  <div class="q-pa-md q-mx-md-xl shadow-3">
    <q-form >
      <div class="q-gutter-sm">
        <span class="label"><strong>Estado:</strong></span>
          <q-radio v-model="estadoProducto" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="Nuevo" label="Nuevo" color="orange" />
          <q-radio v-model="estadoProducto" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="Usado" label="Usado" color="orange" />
      </div>
      <div class="row">
        <div class="col-9">
          <q-input v-model="marcaModel" ref="marcaRef" class="q-mt-sm" filled label="Marca:" label-color="yellow-9" placeholder="Iphone" :rules="[val => !!val || 'Campo Requerido']" />
          </div>
        <div class="col-9">
          <q-input v-model="modeloModel" ref="modeloRef" class="q-mt-sm q-my-none" filled label="Modelo:" label-color="yellow-9" placeholder="6 Plus" :rules="[val => !!val || 'Campo requerido']" />
        </div>
        <div class="col-7">
          <q-input v-model="pantallaModel" ref="pantallaRef" class="q-mt-sm" filled label="Pantalla:" label-color="yellow-9" mask="#.#" unmasked-value placeholder="5.5" :rules="pantallaRules"  type="number" />
        </div>
        <div class="col-3 q-ml-lg q-mt-lg">
          <span class="label">Pulgadas</span>
        </div>
        <div class="col-10">
          <!--Seleccion del sistema operativo-->
          <q-select class="q-mt-sm" filled label="Sistema:" label-color="yellow-9" v-model="Sistema" :options="opcionesSistema" />
        </div>

        <div class="col-5">
          <q-input v-model="romModel" ref="romRef" class="q-mt-sm" filled label="Rom:" label-color="yellow-9" placeholder="64 GB" :dense="dense" :rules="[val => !!val || 'Campo requerido']" />
        </div>
        <div class="col-5 q-ml-lg q-mt-lg">
          <span class="label">Almacenamiento Interno</span>
        </div>
        <div class="col-5">
          <q-input v-model="ramModel" ref="ramRef" class="q-mt-sm" filled label="RAM:" label-color="yellow-9" placeholder="2 GB" :rules="[val => !!val || 'Campo requerido']" />
        </div>

      </div>

    </q-form>
    <div class="row q-mt-md"><q-btn @click="resetDatosNuevos" outline color="yellow-9" label="Limpiar" size="md"/></div>

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    // Opciones del sistema operativo
    const Sistema = ref('Android')
    const opcionesSistema = ['Android', 'Ios', 'Windows', 'Linux']
    const marcaRef = ref(null)
    const modeloRef = ref(null)
    const pantallaRef = ref(null)
    const romRef = ref(null)
    const ramRef = ref(null)

    return {

      validDatosNuev () {
        const validData = [
          marcaRef.value.validate(),
          modeloRef.value.validate(),
          pantallaRef.value.validate(),
          romRef.value.validate(),
          ramRef.value.validate()
        ]
        return validData
      },

      estadoProducto: ref('Nuevo'),
      slide: ref(3),

      marcaRef,
      modeloRef,
      pantallaRef,
      romRef,
      ramRef,

      marcaModel: ref(''),
      modeloModel: ref(''),
      pantallaModel: ref(''),
      romModel: ref(''),
      ramModel: ref(''),

      pantallaRules: [
        val => !!val || 'Campo requerido',
        val => (val > 3.0 && val < 10.0) || 'Ingresa un dato valido'
      ],

      reset () {
        marcaRef.value.resetValidation()
        modeloRef.value.resetValidation()
        pantallaRef.value.resetValidation()
        romRef.value.resetValidation()
        ramRef.value.resetValidation()
      },
      // Opciones de la seleccion del sistema operativo
      Sistema,
      opcionesSistema

    }
  },

  methods: {
    resetDatosNuevos () {
      this.reset()
    },

    obtenerDatosNuevosForm () {
      console.log('marca : ' + this.marcaModel)
      console.log('modelo : ' + this.modeloModel)
      console.log('pantalla : ' + this.pantallaModel)
      console.log('Sistema : ' + this.Sistema)
      console.log('ROM : ' + this.romModel)
      console.log('RAM : ' + this.ramModel)
      const obteniendoDatos = [
        this.marcaModel,
        this.modeloModel,
        this.pantallaModel,
        this.Sistema,
        this.romModel,
        this.ramModel,
        this.estadoProducto
      ]
      return obteniendoDatos
    }
  }
}
</script>
