<template>
  <q-page>
    <div class="row">
      <div class="col-12 col-md-6 q-pl-md-xl q-pt-md-lg">
    <q-carousel
      animated
      v-model="slide"
      arrows
      :autoplay="autoplay"
      navigation
      infinite
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
      </div>
      <div class="col-12 col-md-6 q-pa-md-xl q-pa-sm q-py-lg">
        <span class="label text-dark text-bold text-h6">
          Iphone 6 pantalla de 8 pulgadas, 64Gb internos,
          2Gb de Ram, Sólo Banda Tigo, Nuevo
        </span>
          <div class="q-pt-md">
            <span class="label text-h4 text-bold gt-sm"> $235.00 </span>
          </div>
          <!-- Para pantallas Moviles -->
          <div class="q-pt-md text-center lt-md">
            <span class="label text-h4 text-bold "> $235.00 </span>
          </div>

          <div class="q-py-md">
            <q-btn color="secondary q-pa-md q-px-lg gt-sm" glossy label="Comprar" />
            <q-page-sticky class="lt-md" position="bottom" :offset="[0, 5]" >
            <q-btn to="/" color="primary" glossy class="rotate-0 q-pa-md q-px-lg" label="Inicio" />
            <q-btn color="secondary" glossy class="rotate-0 q-pa-md q-px-lg" label="Comprar" />
          </q-page-sticky>
          </div>
          <fieldset>
          <div class="row">
            <div class="col-7">
              <span class="label">
                Vendedor: {{nombre}}
              </span>
            </div>
            <div class="col-5">
              <span class="label ">
                Telefono: {{telefono}}
              </span>
            </div>
          </div>
          </fieldset>
      </div>
      <div class="col-12 q-pa-lg text-center gt-sm">
        <span class="label text-h4">DESCRIPCIÓN</span>
      </div>
      <div class="col-1 "></div>
      <div class="col-12 col-md-5 q-pr-md-md q-pb-md">
        <fieldset class="q-pa-md text-h6 shadow-3">
          <p class="label" >Estado: <span class="text-amber-14">{{ estado }}</span></p>
          <p class="label" >Marca: <span class="text-amber-14">{{ marca }}</span></p>
          <p class="label" >Modelo: <span class="text-amber-14">{{ modelo }}</span></p>
          <p class="label" >Pantalla: <span class="text-amber-14">{{ pantalla }}</span></p>
          <p class="label" >Sistema:</p>
          <p class="label" >Rom:</p>
          <p class="label" >Ram:</p>
        </fieldset>
      </div>
      <div class="col-12 col-md-5 q-pl-md-md q-pb-md">
        <fieldset class="q-pa-md text-h6 shadow-3" style="min-height: 370px">
          <p class="label">Telefono en muy buenas condiciones, tiene dos cámaras, la caja esta abierta,
            pero con muy poco uso, practicamente nuevo, la compañia con la que estaba es Tigo,
            asi que el chip debe ser tigo, viene con su caja original y con todos sus accesorios.
            Puedo mandar más fotos si desea por whatsapp</p>
      </fieldset>
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
      autoplay: ref(true),
      PrecioNew,
      nombre: 'Juan Perez',
      telefono: '7323-4523',
      estado: 'Nuevo',
      marca: 'Iphone',
      modelo: '6 plus',
      pantalla: '5.5 pulgadas'
    }
  }
}
</script>
