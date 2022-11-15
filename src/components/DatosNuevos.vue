<template>
  <div class="q-pa-md q-mx-md-xl shadow-3">
    <q-form>
      <div class="q-gutter-sm">
        <span class="label"><strong>Estado:</strong></span>
          <q-radio v-model="estadoProducto" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="Nuevo" label="Nuevo" color="orange" />
          <q-radio v-model="estadoProducto" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="Usado" label="Usado" color="orange" />
      </div>
      <div class="row">
        <div class="col-9">
          <q-input ref="controles1" class="q-mt-sm" filled label="Marca:" label-color="yellow-9" placeholder="Iphone" :rules="[val => !!val || 'Campo requerido']"/>
        </div>
        <div class="col-9">
          <q-input ref="controles2" class="q-mt-sm q-my-none" filled label="Modelo:" label-color="yellow-9" placeholder="6 Plus" :rules="[val => !!val || 'Campo requerido']"/>
        </div>
        <div class="col-7">
          <q-input class="q-mt-sm" filled v-model="ph" label="Pantalla:" label-color="yellow-9" placeholder="5.5" />
        </div>
        <div class="col-3 q-ml-lg q-mt-lg">
          <span class="label">Pulgadas</span>
        </div>
        <div class="col-10">
          <!--Seleccion del sistema operativo-->
          <q-select class="q-mt-sm" filled label="Sistema:" label-color="yellow-9" v-model="Sistema" :options="opcionesSistema" />
        </div>

        <div class="col-5">
          <q-input class="q-mt-sm" filled v-model="ph" label="Rom:" label-color="yellow-9" placeholder="64 GB" :dense="dense" />
        </div>
        <div class="col-5 q-ml-lg q-mt-lg">
          <span class="label">Almacenamiento Interno</span>
        </div>
        <div class="col-5">
          <q-input class="q-mt-sm" filled label="RAM:" label-color="yellow-9" placeholder="2 GB" />
        </div>

      </div>

    </q-form>
    <div class="row q-mt-md"><q-btn @click="reset" outline color="yellow-9" label="Limpiar" size="md"/></div>

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    // Opciones del sistema operativo
    const Sistema = ref('Select Option')
    const opcionesSistema = ['Select Option', 'Android', 'Ios', 'Windows', 'Linux']
    const controles1 = ref(null)
    const controles2 = ref(null)

    return {
      estadoProducto: ref('Nuevo'),
      slide: ref(3),
      controles1,
      controles2,
      reset () {
        controles1.value.resetValidation()
        controles2.value.resetValidation()
      },
      // Opciones de la seleccion del sistema operativo
      Sistema,
      opcionesSistema

    }
  }
}
</script>
