<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar>
      <q-icon name ="las la-bullhorn" size="2rem" color="black"/>
      </q-avatar>
    </q-item-section>
    <q-item-section class="text-h6">Tienda CellPhone</q-item-section>
  </q-item>
  <q-separator color="orange" inset />

  <q-item class="text-center">
    <q-item-section><q-btn to="/" stretch flat label="Inicio" /></q-item-section>
  </q-item>
  <q-separator color="yellow" inset />

  <q-item class="text-center">
    <q-item-section><q-btn to="/Newad" stretch flat label="Nuevo Anuncio" /></q-item-section>
  </q-item>
  <q-separator color="orange" inset />

  <q-item class="text-center">
    <q-item-section><q-btn to="/VerAnuncio" stretch flat label="Carrito" /></q-item-section>
  </q-item>
  <q-separator color="orange" inset />
</template>
