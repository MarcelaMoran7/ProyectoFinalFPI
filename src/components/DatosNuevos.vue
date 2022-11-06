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
          <q-input class="q-mt-sm" filled label="Marca:" label-color="yellow-9" placeholder="Iphone" />
        </div>
        <div class="col-9">
          <q-input class="q-mt-sm q-my-none" filled label="Modelo:" label-color="yellow-9" placeholder="6 Plus" />
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

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    // Opciones del sistema operativo
    const Sistema = ref(null)
    const opcionesSistema = ['Select Option', 'Android', 'Ios', 'Windows', 'Linux']
    return {
      estadoProducto: ref('Nuevo'),
      slide: ref(3),
      // Opciones de la seleccion del sistema operativo
      Sistema,
      opcionesSistema

    }
  }
}
</script>
