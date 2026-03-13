import { useRouter } from 'vue-router'
import { APP_PATH } from '../router'

export const useHelloWorldLogic = () => {
  const router = useRouter()

/**
 * サンプルページへ遷移する
 */
const navigateToSample = () => {
  router.push(APP_PATH.SAMPLE)
}

  return {
    navigateToSample
  }
}
