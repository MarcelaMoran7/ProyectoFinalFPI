
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ArticuloPrincipal.vue') },
      { path: 'articulo/:idArticulo', component: () => import('pages/ArticuloIndividual.vue') },
      { path: '/NewAd', component: () => import('pages/NewAd.vue') },
      { path: '/VerAnuncio', component: () => import('pages/VerAnuncio.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
