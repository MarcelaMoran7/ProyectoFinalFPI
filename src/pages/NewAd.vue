<template>
  <q-page>

    <h4 class="text-center text-yellow-9 q-ma-md">Nuevo Anuncio</h4>

    <!-- Inicio Primera fila -->
    <div class="row">

      <!-- Inicio Form parte superior izquierda -->
      <div class="col-12 col-md-6 order-xs-last order-md-first">
          <datos-nuevos /> <!-- Referencia al componente DatosNuevos.vue ubicado en components -->
      </div> <!-- Fin Form parte superior izquierda -->

      <!-- Input Descripcion Solo para moviles -->
      <div class="col-12 order-xs-last q-mt-lg q-px-md lt-md">
        <span class="label text-bold">Descripción</span>
        <q-input v-model="text" filled type="textarea" />
      </div>

      <!-- Inicio Parte superior derecha -->
      <div class="col-12 col-md-6 ">
        <!-- Inferior todos los input -->
        <div class="q-pa-md q-mx-md-xl ">
          <span class="label text-bold">Titulo Breve Del Anuncio</span>
          <q-input class="q-mt-sm" filled v-model="ph" label="Titulo:" label-color="yellow-9" placeholder="" />
          <!-- Precio se muestra solo en pantallas moviles -->
          <div class="row justify-center lt-md">
            <precio-new style="max-width: 300px" /> <!-- Referencia Al componente PrecioNew.vue ubicado En components -->
          </div>
          <!-- Input vendedor y telefono -->
          <div class="row">
            <div class="col-6 col-md-8">
              <q-input class="q-mt-sm" filled v-model="ph" label="Vendedor:" label-color="yellow-9" placeholder="Juan Perez" :dense="dense" />
            </div>
            <div class="col-6 col-md-5">
              <q-input class="q-my-sm" label-color="yellow-9" filled v-model="phone" label="Telefono" mask="#### - ####" unmasked-value placeholder="#### - ####" />
            </div>
          </div>
          <!-- Input Descripcion Solo para Desktop -->
          <div class="q-mt-lg gt-sm " style="max-width: 410px">
            <span class="label text-bold">Descripción</span>
            <q-input v-model="text" filled type="textarea" />
          </div>
        </div>
      </div> <!-- Fin Parte superior derecha -->

      <!--Inicio, Agregar imagenes del nuevo producto "parte inferior izquierda" -->
      <div class="col-12 col-md-7 order-xs-first order-md-last">
        <nuevas-imagenes /> <!-- Referencia al componente NuevasImagenes.vue ubicado en components -->
      </div> <!-- Fin Agregar imagenes "Parte Inferior Izquierda" -->

      <!-- Inicio Parte inferior derecha -->
      <div class="col-12 col-md-5 q-pa-md-xl order-xs-last">
        <precio-new class="gt-sm q-mx-lg" /> <!-- Referencia Al Archivo PrecioNew.vue ubicado En components -->
        <!-- Botones Cancelar y Crear -->
        <div class=" q-pa-xs-lg q-gutter-md float-right q-ma-md">
          <q-btn class="q-py-md q-px-md " color="red" icon="las la-times-circle" label="Cancelar" />
          <q-btn class="q-py-md q-px-md " color="secondary" icon="las la-save" label="Crear" />
        </div>
      </div> <!-- Fin Parte inferior derecha -->

    </div> <!-- Fin Primera fila -->

  </q-page>
</template>

<!--Script de esta pagina -->
<script>
import DatosNuevos from 'src/components/DatosNuevos.vue'
import NuevasImagenes from 'src/components/NuevasImagenes.vue'
import PrecioNew from 'src/components/PrecioNew.vue'

export default {
  name: 'NewAd',

  components: {
    DatosNuevos,
    NuevasImagenes,
    PrecioNew
  },

  setup () {
    return {
      DatosNuevos,
      NuevasImagenes,
      PrecioNew
    }
  }
}
</script>
