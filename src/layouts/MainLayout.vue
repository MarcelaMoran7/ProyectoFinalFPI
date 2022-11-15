<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-yellow-5" v-if="!mostrarDrawerYHeader || this.$route.path === '/VerAnuncio'">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="black"
          @click="toggleLeftDrawer"
        />

        <q-avatar class="mobile-hide">
          <q-icon name ="las la-bullhorn" size="2rem" color="black"/>
        </q-avatar>

        <q-toolbar-title class="text-dark mobile-hide" >
          Tienda CellPhone
        </q-toolbar-title>

        <q-input rounded class="GPL__toolbar-input col-9 col-lg-5" dense standout="bg-blue-grey-3" v-model="search" placeholder="Search">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>
        <q-space />

        <q-btn to="/" class=" q-ma-md mobile-hide" color="blue-grey-3" label="Inicio" />
        <q-space />

        <q-btn :to="'/Newad'" class=" q-ma-sm mobile-hide" round color="blue-grey-3" icon="las la-plus" />
        <div><q-btn class=" q-ma-sm mobile-hide" flat round color="dark" icon="shopping_cart" size="20px"/></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      v-if="!mostrarDrawerYHeader"
    >

    <div v-if="drawerInicio" ><MenuFiltros></MenuFiltros></div>
    <div v-else><MenuMobile></MenuMobile></div>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MenuFiltros from 'components/MenuFiltros.vue'
import MenuMobile from 'components/MenuMobile.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuFiltros,
    MenuMobile
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      MenuFiltros,
      MenuMobile,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {

  },
  computed: {
    mostrarDrawerYHeader () {
      return (this.$route.path === '/Newad' && screen.width >= 1023) || (this.$route.path === '/VerAnuncio' && screen.width >= 1023)
    },
    drawerInicio () {
      return (this.$route.path === '/' && screen.width >= 1023)
    }
  }
})
</script>
<style lang="sass">
.GPL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 35%
    border-radius: 3rem
</style>
