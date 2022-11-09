<template>
  <fieldset class="q-pa-md q-mx-md-xl q-mt-md-md shadow-3">
    <legend>IMAGENES</legend>

    <!-- Inicio Fila uno -->
    <div class="row ">

      <!-- Botones Agregar/ quitar solo se muestra en Desktop -->
      <div class="col-2 gt-sm">
         <!-- Agregar archivos el q-file se usa porque solo el boton no funciono -->
         <q-file class="hidden" ref="file"></q-file>
        <div><q-btn @click="addFoto" class="q-pa-md q-ma-sm" round color="secondary" icon="las la-plus" /></div>
        <q-btn class="q-pa-md q-ma-sm" round color="red" icon="las la-minus" />
      </div>

      <!-- Tabla de datos solo se muesta en pantallas md hacia arriba -->
      <div class="col-5 gt-xs ">
        <q-table class="my-sticky-header-table" title="Detalles Add" no-data-label="No hay datos para mostrar" :rows="rows" :columns="columns" row-key="name" flat bordered />
      </div>

      <!-- Carousel de agregar nuevas fotografias -->
      <div class=" col-xs-12 col-sm-7 col-md-5 relative-position q-pl-xs">
        <q-carousel swipeable animated v-model="slide" thumbnails infinite>
          <q-carousel-slide :name="1" img-src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2021%2F06%2Fapple-iphone-14-cheapest-series-model-rumor-info-0.jpg?w=960&cbr=1&q=90&fit=max" />
          <q-carousel-slide :name="2" img-src="https://cdn.vox-cdn.com/thumbor/cPeVH-m_b9pScRXzpCBW-nAHSfw=/0x0:2032x1355/1400x1400/filters:focal(1016x678:1017x679)/cdn.vox-cdn.com/uploads/chorus_asset/file/22863258/akrales_210917_4760_0175.jpg" />
          <q-carousel-slide :name="3" img-src="https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2022/01/iphone-14-in-hand.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1" />
          <q-carousel-slide :name="4" img-src="https://www.91-img.com/pictures/136277-v3-samsung-galaxy-a51-mobile-phone-large-1.jpg" />
        </q-carousel>

        <!-- Botones Agregar/ quitar solo se muestra en moviles -->
        <div class="col-2 absolute-center lt-md">
          <div>
            <!-- Agregar archivos el q-file se usa porque solo el boton no funciono -->
            <q-file class="hidden" ref="file"></q-file>
            <q-btn @click="addFoto" class="q-pa-md q-ma-sm" round color="secondary" icon="las la-plus" />
            <q-btn class="q-pa-md q-ma-sm" round color="red" icon="las la-minus" />
            <p class="text-bold text-center">AGREGAR/QUITAR <br> FOTOGRAFIAS</p>
          </div>
        </div>

      </div>

    </div> <!-- Fin Fila uno -->

  </fieldset>
</template>

<script>
import { ref } from 'vue'

const columns = [
  {
    name: 'N',
    label: 'N',
    align: 'left',
    field: 'N',
    sortable: true
  },
  {
    name: 'tamaño',
    label: 'Tamaño',
    align: 'left',
    field: 'tamaño',
    sortable: true
  },
  {
    name: 'tipo',
    label: 'Tipo',
    align: 'left',
    field: 'tipo',
    sortable: true
  }
]

const rows = [
  {
    N: '1',
    tamaño: '145 kb',
    tipo: 'jpg'
  },
  {
    N: '2',
    tamaño: '145 kb',
    tipo: 'png'
  },
  {
    N: '3',
    tamaño: '145 kb',
    tipo: 'png'
  },
  {
    N: '4',
    tamaño: '145 kb',
    tipo: 'jpg'
  },
  {
    N: '5',
    tamaño: '145 kb',
    tipo: 'png'
  }
]

export default {
  name: 'NuevasImagenes',
  data () {
    return {
      slide: ref(1),
      columns,
      rows,
      files: ref(null)
    }
  },
  methods: {

    addFoto () {
      this.$refs.file.pickFiles()
    }

  }
}
</script>
