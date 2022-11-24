<template>
  <q-page>
    <div class="row bg-grey-10">
      <transition appear enter-active-class="animated flipInY slow" leave-active-class="animated flipOutY slow">
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
      <q-carousel-slide
        v-for="(imagen, key) in UrlImagenes" :key="'img-' + key"
        :name="key"
        :img-src="imagen"
      />
    </q-carousel>
      </div>

      </transition>

      <transition appear enter-active-class="animated rollIn slow" leave-active-class="animated rollOut slow">
        <div class="col-12 col-md-6 q-pa-md-xl q-pa-sm q-py-lg">
        <span class="label text-white text-bold text-h6"> {{titulo}} </span>
          <div class="q-pt-md">
            <span class="label text-white text-h4 text-bold gt-sm text-amber-14"> {{precio}} </span>
          </div>
          <!-- Para pantallas Moviles -->
          <div class="q-pt-md text-center lt-md">
            <span class="label text-h4 text-bold text-amber-14 "> {{precio}} </span>
          </div>

          <div class="q-py-md">
            <q-btn color="yellow-13 q-pa-md q-px-lg gt-sm" glossy label="Comprar" />
            <q-page-sticky class="lt-md" position="bottom" :offset="[0, 5]" >
            <q-btn to="/" color="primary" glossy class="rotate-0 q-pa-md q-px-lg" label="Inicio" />
            <q-btn @click="AgregarCarrito" color="yellow-13" glossy class="rotate-0 q-pa-md q-px-lg" label="Comprar" />
          </q-page-sticky>
          </div>
          <fieldset>
          <div class="row">
            <div class="col-7">
              <span class="label text-white">
                Vendedor: {{vendedor}}
              </span>
            </div>
            <div class="col-5">
              <span class="label text-white">
                Telefono: {{telefono}}
              </span>
            </div>
          </div>
          </fieldset>
      </div>

      </transition>

      <div class="col-12 q-pa-lg text-center gt-sm">
        <span class="label text-h4 text-white">DESCRIPCIÓN</span>
      </div>
      <div class="col-1 "></div>
      <transition appear enter-active-class="animated flipInY slow" leave-active-class="animated flipOutY slow">
        <div class="col-12 col-md-5 q-pr-md-md q-pb-md">
        <fieldset class="q-pa-md text-h6 shadow-3 text-white">
          <p class="label" >Estado: <span class="text-amber-14">{{ estado }}</span></p>
          <p class="label" >Marca: <span class="text-amber-14">{{ marca }}</span></p>
          <p class="label" >Modelo: <span class="text-amber-14">{{ modelo }}</span></p>
          <p class="label" >Pantalla: <span class="text-amber-14">{{ pantalla }}</span></p>
          <p class="label" >Sistema: <span class="text-amber-14">{{ sistema }}</span></p>
          <p class="label" >Rom: <span class="text-amber-14">{{ rom }}</span></p>
          <p class="label" >Ram: <span class="text-amber-14">{{ ram }}</span></p>
        </fieldset>
      </div>
      </transition>

      <transition appear enter-active-class="animated flipInY slow" leave-active-class="animated flipOutY slow">
        <div class="col-12 col-md-5 q-pl-md-md q-pb-md">
        <fieldset class="q-pa-md text-h6 shadow-3" style="min-height: 370px">
          <p class="label"><span class="text-amber-14">{{ descripcion }}</span></p>
      </fieldset>
      </div>

      </transition>

    </div>

  </q-page>
</template>

<script setup>

import { ref, onMounted } from 'vue'
// import { useCounterStore } from 'stores/dataglobal'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'src/boot/database'
import { useQuasar } from 'quasar'

import { getStorage, ref as refStorage, listAll, getDownloadURL } from 'firebase/storage'

// import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const $q = useQuasar()

const idarticulo = ref('')

idarticulo.value = route.params.idArticulo

const storage = getStorage()
const UrlImagenes = ref([])

const slide = ref(1)
const autoplay = ref(true)

const precio = ref(null)
const titulo = ref(null)

const vendedor = ref(null)
const telefono = ref('')
const estado = ref(null)
const marca = ref(null)
const modelo = ref(null)
const pantalla = ref(null)
const sistema = ref(null)
const rom = ref(null)
const ram = ref(null)
const descripcion = ref(null)

// METODOS

function triggerNotificando (tipo, mensaje) {
  $q.notify({
    type: tipo,
    message: mensaje
  })
}

const AgregarCarrito = function () {
  triggerNotificando('positive', 'Se Agrego Correctamente El Articulo Al Carrito.')
}

const listarDocumento = async function () {
  const docRef = doc(db, 'anuncio', idarticulo.value)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data: ', docSnap.data())
    console.log('Document data: ', docSnap.data().telefono)

    cargarImagenes()
    titulo.value = docSnap.data().titulo
    precio.value = '$' + docSnap.data().precio
    telefono.value = docSnap.data().telefono
    estado.value = docSnap.data().estado
    marca.value = docSnap.data().marca
    modelo.value = docSnap.data().modelo
    pantalla.value = docSnap.data().pantalla
    sistema.value = docSnap.data().sistema
    rom.value = docSnap.data().rom
    ram.value = docSnap.data().ram
    descripcion.value = docSnap.data().descripcion
    vendedor.value = docSnap.data().vendedor
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!')
  }
}

function cargarImagenes () {
  console.log('Cargar Imagenes')
  // Create a reference under which you want to list
  const listRef = refStorage(storage, idarticulo.value)

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      })
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log(itemRef)
        // console.log(itemRef.fullPath)

        // OBTENIENDO URL

        getDownloadURL(refStorage(storage, itemRef.fullPath))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            console.log('estas son las url ' + url)
            UrlImagenes.value.push(url)
          })
          .catch((error) => {
            // Handle any errors
            console.log(error)
          })

        // OBTENIENDO URL
      })
    }).catch((error) => {
      console.log(error)
      // Uh-oh, an error occurred!
    })
}

onMounted(() => {
  listarDocumento()
})

</script>
