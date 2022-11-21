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
        <span class="label text-dark text-bold text-h6"> {{titulo}} </span>
          <div class="q-pt-md">
            <span class="label text-h4 text-bold gt-sm"> {{precio}} </span>
          </div>
          <!-- Para pantallas Moviles -->
          <div class="q-pt-md text-center lt-md">
            <span class="label text-h4 text-bold "> {{precio}} </span>
          </div>

          <div class="q-py-md">
            <q-btn color="secondary q-pa-md q-px-lg gt-sm" glossy label="Comprar" />
            <q-page-sticky class="lt-md" position="bottom" :offset="[0, 5]" >
            <q-btn to="/" color="primary" glossy class="rotate-0 q-pa-md q-px-lg" label="Inicio" />
            <q-btn color="secondary" glossy class="rotate-0 q-pa-md q-px-lg" label="Comprar" />
            <q-btn label="Probando" @click="listarDatos" />
            <q-btn label="ProbandDOc" @click="listarDocumento" />
          </q-page-sticky>
          </div>
          <fieldset>
          <div class="row">
            <div class="col-7">
              <span class="label">
                Vendedor: {{vendedor}}
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
          <p class="label" >Sistema: <span class="text-amber-14">{{ sistema }}</span></p>
          <p class="label" >Rom: <span class="text-amber-14">{{ rom }}</span></p>
          <p class="label" >Ram: <span class="text-amber-14">{{ ram }}</span></p>
        </fieldset>
      </div>
      <div class="col-12 col-md-5 q-pl-md-md q-pb-md">
        <fieldset class="q-pa-md text-h6 shadow-3" style="min-height: 370px">
          <p class="label"><span class="text-amber-14">{{ descripcion }}</span></p>
      </fieldset>
      </div>
    </div>

  </q-page>
</template>

<script setup>

import { ref } from 'vue'
// import { useCounterStore } from 'stores/dataglobal'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from 'src/boot/database'

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

const datos = ref([])

// METODOS

const listarDatos = async function () {
  // cargando los sistemas
  const querySnapshot1 = await getDocs(collection(db, 'anuncio'))
  querySnapshot1.forEach((doc) => {
    console.log(doc.data())
    console.log(doc.data().precio)
    datos.value.push({ precio: doc.data().precio, descripcion: doc.data().descripcion, estado: doc.data().estado })
  })
  console.log(datos)
}
// oq6BGo61XEKHQPzA9Y4Y   sJIyZSfji6tuJDG5jgLi
const listarDocumento = async function () {
  const docRef = doc(db, 'anuncio', 'oq6BGo61XEKHQPzA9Y4Y')
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    console.log('Document data: ', docSnap.data())
    console.log('Document data: ', docSnap.data().telefono)

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

</script>
