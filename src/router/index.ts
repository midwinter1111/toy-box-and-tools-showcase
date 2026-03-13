import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../views/HelloWorld.vue'
import ErrorPage from '../views/ErrorPage.vue'
import ComponentShowcase from '@/views/ComponentShowcase/ComponentShowcase.vue'
import CardFlip from '@/views/CardFlip/CardFlip.vue'
import SamplePage from '@/views/SamplePage.vue'
import BlueArchiveTrainingList from '@/views/BlueArchiveTrainingList/BlueArchiveTrainingList.vue'

/**
 * アプリケーション内のパス定義
 * コンポーネント側で router.push(APP_PATH.SAMPLE) のように利用します
 */
export const APP_PATH = {
  ROOT: '/',
  SAMPLE: '/sample',
  CARD_FLIP: '/card-flip',
  COMPONENT_SHOWCASE: '/component-showcase',
  BA_TRAIN: '/ba-train',
  ERROR: '/error',
} as const

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: APP_PATH.ROOT,
      name: 'root',
      component: HelloWorld
    },
    {
      path: APP_PATH.SAMPLE,
      name: 'sample',
      component: SamplePage
    },
    {
      path: APP_PATH.CARD_FLIP,
      name: 'card-flip',
      component: CardFlip
    },
    {
      path: APP_PATH.COMPONENT_SHOWCASE,
      name: 'component-showcase',
      component: ComponentShowcase
    },
    {
      path: APP_PATH.BA_TRAIN,
      name: 'blue-archive-training-list',
      component: BlueArchiveTrainingList
    },
    {
      path: APP_PATH.ERROR,
      name: 'error',
      component: ErrorPage
    },
    // 定義外のURLにアクセスされた場合もエラー画面へ飛ばす設定
    {
      path: '/:pathMatch(.*)*',
      redirect: APP_PATH.ERROR
    }
  ]
})

export default router
