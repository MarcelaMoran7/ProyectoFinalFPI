<template>
  <q-page>
    <div class="row">
      <div class="col-6 bg-secondary q-pl-xl q-pt-lg">
    <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      infinite
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
      </div>
      <div class="col-6 bg-primary q-pa-xl ">
        <span class="label text-white text-bold">
          Iphone 6 pantalla de 8 pulgadas, 64Gb internos,
          2Gb de Ram, Sólo Banda Tigo, Nuevo
        </span>
          <div class="q-pt-md">
            <span class="label text-h4 text-bold"> $235.00 </span>
          </div>
          <div class="q-py-md">
            <q-btn color="secondary" glossy label="Comprar" />
          </div>
          <fieldset>
          <div class="row">
            <div class="col-6">
              <span class="label">
                Vendedor: {{nombre}}
              </span>
            </div>
            <div class="col-6">
              <span class="label">
                Telefono: {{telefono}}
              </span>
            </div>

          </div>
          </fieldset>
      </div>
      <div class="col-12 q-pa-md">
        <span class="label text-h4">DESCRIPCIÓN</span>
      </div>
      <div class="col-1"></div>
      <div class="col-5">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta officiis esse culpa quidem excepturi possimus exercitationem incidunt accusamus sunt explicabo accusantium in sapiente, veritatis maxime eligendi at, dolorem tempora quis!</p>
      </div>
      <div class="col-5">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta officiis esse culpa quidem excepturi possimus exercitationem incidunt accusamus sunt explicabo accusantium in sapiente, veritatis maxime eligendi at, dolorem tempora quis!</p>
      </div>
    </div>

  </q-page>
</template>

<script>

import { ref } from 'vue'
import PrecioNew from 'src/components/PrecioNew.vue'

export default {

  name: 'VerAnuncio',

  components: {
    // PrecioNew
  },

  setup () {
    return {
      slide: ref(1),
      PrecioNew,
      nombre: 'Juan Perez',
      telefono: '7323-4523'
    }
  }
}
</script>
