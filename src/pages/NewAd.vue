<template>
  <q-page class="bg-grey-2">

    <h4 class="text-center text-yellow-9 q-ma-md">Nuevo Anuncio</h4>

    <!-- Inicio Primera fila -->
    <div class="row">

      <!-- Inicio Form parte superior izquierda -->
      <transition appear enter-active-class="animated rotateInDownLeft slow" leave-active-class="animated rotateInUpLeft slow">
        <div class="col-12 col-md-6 order-xs-last order-md-first">
        <DatosNuevos ref="DatosRefReseteando" /> <!-- Referencia al componente DatosNuevos.vue ubicado en components -->
      </div> <!-- Fin Form parte superior izquierda -->
      </transition>

      <!-- Input Descripcion Solo para moviles -->
      <div class="col-12 order-xs-last q-mt-lg q-px-md lt-md">
        <span class="label text-bold">Descripción</span>
        <q-input v-model="descripcionModel" ref="descripcionRef" filled type="textarea" :rules="[val => !!val || 'Campo requerido']" />
      </div>

      <transition appear enter-active-class="animated rotateInDownRight slow" leave-active-class="animated rotateInUpRight slow">
        <!-- Inicio Parte superior derecha -->
      <div class="col-12 col-md-6 ">
        <!-- Inferior todos los input -->
        <div class="q-pa-md q-mx-md-xl ">

          <span class="label text-bold">Titulo Breve Del Anuncio</span>
          <q-input v-model="tituloModel" ref="tituloRef" class="q-mt-sm" filled label="Titulo:" label-color="yellow-9" placeholder="" :rules="[val => !!val || 'Campo requerido']" />

            <!-- Precio se muestra solo en pantallas moviles -->
          <div class="row justify-center lt-md">
            <fieldset>
              <legend>PRECIO</legend>
              <q-input ref="preciosRef" filled type="number" bottom-slots v-model="preciosModel" label="Ingrese el precio" label-color="yellow-9"  :dense="dense" :rules="[val => !!val || 'Campo requerido']" >
                <template v-slot:prepend>
                  <q-icon name="las la-dollar-sign" />
                </template>
              </q-input>
            </fieldset>
          </div>

          <!-- Input vendedor y telefono -->
          <div class="row">
            <div class="col-6 col-md-8">
              <q-input  v-model="vendedorModel" ref="vendedorRef" class="q-mt-sm" filled label="Vendedor:" label-color="yellow-9" placeholder="Juan Perez" :dense="dense" :rules="[val => !!val || 'Campo requerido']"  />
            </div>
            <div class="col-6 col-md-5">
              <q-input v-model="telefonoModel" ref="telefonoRef" class="q-my-sm" label-color="yellow-9" filled label="Telefono" mask="#### - ####" unmasked-value placeholder="#### - ####" :rules="[val => !!val || 'Campo requerido']" />
            </div>
          </div>

          <!-- Input Descripcion Solo para Desktop -->
          <div class="q-mt-lg gt-sm " style="max-width: 410px">
            <span class="label text-bold">Descripción</span>
            <q-input v-model="descripcionModel" ref="descripcionRef" filled type="textarea" :rules="[val => !!val || 'Campo requerido']" />
          </div>
        </div>
      </div> <!-- Fin Parte superior derecha -->
      </transition>

      <transition appear enter-active-class="animated zoomInDown slow" leave-active-class="animated zoomOutDown slow">
         <!--Inicio, Agregar imagenes del nuevo producto "parte inferior izquierda" -->
      <div class="col-12 col-md-7 order-xs-first order-md-last">
        <fieldset class="q-pa-md q-mx-md-xl q-mt-md-md shadow-3">
          <legend>IMAGENES</legend>
          <!-- Inicio Fila uno -->
          <div class="row ">

            <!-- Botones Agregar/ quitar solo se muestra en Desktop -->
            <div class="col-2 gt-sm">
              <!-- Agregar archivos el q-file se usa porque solo el boton no funciono -->
              <q-file
                class="hidden"
                v-model="fotosModel"
                multiple
                filled accept=".jpg, image/*"
                ref="files"
                @update:model-value="obtenerURL">
              </q-file>
              <div><q-btn @click="addFoto" class="q-pa-md q-ma-sm" round color="secondary" icon="las la-plus" /></div>
              <q-btn @click="cancelarFotos" class="q-pa-md q-ma-sm" round color="red" icon="las la-minus" />
            </div>

            <!-- Tabla de datos solo se muesta en pantallas md hacia arriba -->
            <div class="col-5 gt-xs ">
              <q-table class="my-sticky-header-table" title="Detalles Add" no-data-label="No hay datos para mostrar" :rows="rows" :columns="columns" row-key="name" flat bordered />
            </div>

            <!-- Carousel de agregar nuevas fotografias -->
            <div class=" col-xs-12 col-sm-7 col-md-5 relative-position q-pl-xs">
              <q-carousel swipeable animated v-model="slide" thumbnails infinite>
                <q-carousel-slide
                  v-for="(img,id) in fotosURL" :key="id" :name="id+1" :img-src="img">
                </q-carousel-slide>
              </q-carousel>

              <!-- Botones Agregar/ quitar solo se muestra en moviles -->
              <div class="col-2 absolute-center lt-md">
                <!--<div>-->
                  <!-- Agregar archivos el q-file se usa porque solo el boton no funciono -->
                  <q-file
                    class="hidden"
                    v-model="fotosModel"
                    multiple
                    filled accept=".jpg, image/*"
                    ref="files"
                    @update:model-value="obtenerURL"
                    >
                  </q-file>
                  <q-btn @click="addFoto" class="q-pa-md q-ma-sm" round color="secondary" icon="las la-plus" />
                  <q-btn @click="cancelarFotos" class="q-pa-md q-ma-sm" round color="red" icon="las la-minus" />
                  <p class="text-bold text-center">AGREGAR/QUITAR <br> FOTOGRAFIAS</p>
                <!--</div>-->
              </div>
            </div>
          </div> <!-- Fin Fila uno -->
        </fieldset>
      </div> <!-- Fin Agregar imagenes "Parte Inferior Izquierda" -->
      </transition>

      <!-- Inicio Parte inferior derecha -->
      <div class="col-12 col-md-5 q-pa-md-xl order-xs-last">
        <!-- Precio solo para Desktop -->
        <div class="gt-sm q-mx-lg">
          <fieldset>
              <legend>PRECIO</legend>
              <q-input ref="preciosRef" filled type="number" bottom-slots v-model="preciosModel" label="Ingrese el precio" label-color="yellow-9"  :dense="dense" :rules="[val => !!val || 'Campo requerido']" >
                <template v-slot:prepend>
                  <q-icon name="las la-dollar-sign" />
                </template>
              </q-input>
          </fieldset>
        </div>

         <!-- <precio-new ref="preciosRef" v-model="preciosModel" class="gt-sm q-mx-lg" />  Referencia Al Archivo PrecioNew.vue ubicado En components -->
        <!-- Botones Cancelar y Crear -->
        <div class=" q-pa-xs-lg q-gutter-md float-right q-ma-md">
          <q-btn @click="reseteame" class="q-py-md q-px-md " color="red" icon="las la-times-circle" label="Cancelar" />
          <q-btn @click="saveWork" class="q-py-md q-px-md " color="secondary" icon="las la-save" label="Crear" />
          <!--<q-btn @click="fecha" label="obten Fecha"></q-btn>-->
        </div>
      </div> <!-- Fin Parte inferior derecha -->
    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import DatosNuevos from 'src/components/DatosNuevos.vue'
import { collection, addDoc } from '@firebase/firestore'
import { db } from 'src/boot/database'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

import { getStorage, ref as ref2, uploadBytes } from '@firebase/storage'

// REFERENCIAS
const tituloRef = ref(null)
const vendedorRef = ref(null)
const telefonoRef = ref(null)
const descripcionRef = ref(null)

const idArticulo = ref('')

// CONSTANTE RUTAS, NOTIFICACIONES
const router = useRouter()
const $q = useQuasar()

// REFERENCIAS COMPONENTES EXTERNOS
const preciosRef = ref(null)
const DatosRefReseteando = ref(null)
// MODEL COMPONENTES EXTERNOS
const preciosModel = ref('')

// MODEL
const tituloModel = ref('')
const vendedorModel = ref('')
const telefonoModel = ref('')
const descripcionModel = ref('')

// METODOS
function reseteame () {
  tituloRef.value.resetValidation()
  vendedorRef.value.resetValidation()
  telefonoRef.value.resetValidation()
  descripcionRef.value.resetValidation()

  preciosRef.value.resetValidation()
  DatosRefReseteando.value.resetDatosNuevos()
}

function valids () {
  const titul = [
    tituloRef.value.validate(),
    vendedorRef.value.validate(),
    telefonoRef.value.validate(),
    descripcionRef.value.validate(),
    preciosRef.value.validate()
  ]
  return titul
}

function triggerNotificando (tipo, mensaje) {
  $q.notify({
    type: tipo,
    message: mensaje
  })
}

const saveWork = async function () {
  const validDatosNue = DatosRefReseteando.value.validDatosNuev()

  valids()
  DatosRefReseteando.value.validDatosNuev()
  if ((fotosModel.value !== null) && valids()[0] && valids()[1] && valids()[2] && valids()[3] && valids()[4] && validDatosNue[0] && validDatosNue[1] && validDatosNue[2] && validDatosNue[3] && validDatosNue[4]) {
    guardarArticulo()
  } else {
    console.log('hubo algun problema')
    if (fotosModel.value === null && !valids()[0] && !valids()[1] && !valids()[2] && !valids()[3] && !valids()[4] && !validDatosNue[0] && !validDatosNue[1] && !validDatosNue[2] && !validDatosNue[3] && !validDatosNue[4]) {
      triggerNotificando('negative', 'Error Debes Agregar Al Menos Una Foto Del Producto.')
      triggerNotificando('negative', 'Por favor Completa Todos Los Campos Requeridos.')
    } else if (fotosModel.value === null) {
      triggerNotificando('negative', 'Error Debes Agregar Al Menos Una Foto Del Producto.')
    } else if (fotosModel.value !== null) {
      triggerNotificando('negative', 'Por favor Completa Todos Los Campos Requeridos.')
    }
  }
}

const fecha = function () {
  const fecha = Date.now()
  const hoy = new Date(fecha)
  const fechaActual = hoy.toLocaleDateString()
  console.log(hoy.toLocaleDateString())
  return fechaActual
}

const guardarArticulo = async function () {
  const datos = DatosRefReseteando.value.obtenerDatosNuevosForm()
  console.log(datos[0], ' ', datos[1], ' ', datos[6])

  try {
    const resDB = await addDoc(collection(db, 'anuncio'), {
      titulo: tituloModel.value,
      vendedor: vendedorModel.value,
      telefono: telefonoModel.value,
      descripcion: descripcionModel.value,
      precio: preciosModel.value,
      marca: datos[0],
      modelo: datos[1],
      pantalla: datos[2],
      sistema: datos[3],
      rom: datos[4],
      ram: datos[5],
      estado: datos[6],
      fecha: fecha()

    })
    idArticulo.value = resDB.id
    console.log(resDB.id)
    console.log('se guardo satistactoriamente Articulo')
    subirFotos()
  } catch (error) {
    console.log(error)
    triggerNotificando('negative', 'ERROR DATOS NO GUARDADOS.')
  }
}

// METODOS USADOS EN LA SECCION DE IMAGENES

const slide = ref(1)
const fotosModel = ref(null)
const fotosURL = ref([])
const objetoFotos = ref([])
const indice = ref(null)

const files = ref(null)
const contaImg = ref(0)

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

const rows = ref([])

const cancelarFotos = function () {
  console.log(slide.value + ' ' + indice.value)
  if (fotosModel.value !== null) {
    indice.value = slide.value
    if (indice.value !== -1) {
      fotosModel.value.splice(indice.value - 1, 1)
      // rows.value.splice(indice.value - 1, 1)
      fotosURL.value = []
      rows.value = []
      slide.value = 1
      obtenerURL()
    }
  }
}

const subirFotos = function () {
  const storage = getStorage()
  fotosModel.value.forEach((foto) => {
    const storageRef = ref2(storage, idArticulo.value + '/' + foto.name)
    uploadBytes(storageRef, foto).then((snapshot) => {
      contaImg.value++
      esLaUltima()
    })
  })
}

function esLaUltima () {
  if (contaImg.value === fotosModel.value.length) {
    console.log('todo correcto!!')
    triggerNotificando('positive', 'Se han guardado todos los datos satisfactoriamente.')
    console.log('se guardo satistactoriamente imagenes')
    router.push('/')
  }
}

const addFoto = function () {
  // this.$refs.files.pickFiles()
  files.value.pickFiles()
}

function obtenerURL () {
  if (fotosModel.value) {
    fotosModel.value.forEach((element, index) => {
      fotosURL.value.push(URL.createObjectURL(element))

      rows.value.push(
        {
          N: index + 1,
          tamaño: (Math.round(((fotosModel.value[index].size) / 1024)) + ' KB'),
          // tipo: ((fotosModel.value[index].name).substr(-3))
          tipo: ((fotosModel.value[index].type).split('/')[1])
        }
      )
      objetoFotos.value.push(fotosModel.value[index])
      /* console.log(fotosModel.value[index])
      console.log('Nombre : ' + (fotosModel.value[index].name))
      console.log('Tipo : ' + (fotosModel.value[index].name).substr(-3))
      console.log('Tamaño : ' + (Math.round(((fotosModel.value[index].size) / 1024)) + ' KB'))
      console.log('Estas es la prube ') */
    })
  }
}

</script>
