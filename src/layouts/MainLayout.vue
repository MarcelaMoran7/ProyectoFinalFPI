<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-yellow-5" v-if="mostrarDrawerYHeader">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="black"
          @click="toggleLeftDrawer"
          class="lt-md"
        /> <!-- desktop-hide mobile-hide-->
        <q-avatar class="gt-sm">
          <q-icon name ="las la-bullhorn" size="2rem" color="black"/>
        </q-avatar>
        <transition
        appear
        enter-active-class="animated bounceInDown slow"
        leave-active-class="animated flipOutY slow">
       <q-toolbar-title class="text-dark gt-sm" >
          Tienda CellPhone
        </q-toolbar-title>

        </transition>

        <q-input rounded class="GPL__toolbar-input col-9 col-lg-5" dense standout="bg-blue-grey-3" v-model="search" placeholder="Search">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>
        <q-space />

        <!-- mobile-hide -->
        <q-btn to="/" class=" q-ma-md gt-sm" color="blue-grey-3" label="Inicio" />
        <q-space />

        <q-btn :to="'/Newad'" class=" q-ma-sm gt-sm" round color="blue-grey-3" icon="las la-plus" />
        <div><q-btn :to="'/VerAnuncio'" class=" q-ma-sm gt-sm" flat round color="dark" icon="shopping_cart" size="20px"/></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
     v-if="drawerInicio" >  <!-- v-if="drawerInicio"  -->
      <MenuMobile></MenuMobile>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MenuMobile from 'components/MenuMobile.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuMobile
  },

  setup () {
    const leftDrawerOpen = ref(false)
    return {
      MenuMobile,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  computed: {
    /* mostrarDrawerYHeader () {
      return (this.$route.path !== '/Newad' && window.innerWidth >= 1023) || (window.innerWidth < 1023)
    },
    drawerInicio () {
      return (window.innerWidth < 1023)
    } */
    mostrarDrawerYHeader () {
      return (this.$route.path !== '/Newad' && screen.width >= 1023) || (screen.width < 1023)
    },
    drawerInicio () {
      return (screen.width < 1023)
    }
  }
})
</script>

<!--<script setup>
import { ref } from 'vue'
import MenuMobile from 'components/MenuMobile.vue'

const leftDrawerOpen = ref(false)
leftDrawerOpen.value = !leftDrawerOpen.value

const mostrarDrawerYHeader = function () {
  return (this.$route.path !== '/Newad' && screen.width >= 1023) || (screen.width < 1023)
}
const drawerInicio = function () {
  return (screen.width < 1023)
}
</script>-->

<style lang="sass">
.GPL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 35%
    border-radius: 3rem
</style>
