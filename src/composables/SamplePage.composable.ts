import { useRouter } from 'vue-router'
import { APP_PATH } from '../router'

export const useSampleLogic = () => {
  const router = useRouter()

  const goBack = () => {
  router.push(APP_PATH.ROOT)
  }

  const triggerError = () => {
    throw new Error('テスト用の意図的なエラーが発生しました。')
  }

  return {
    goBack,
    triggerError
  }
}
