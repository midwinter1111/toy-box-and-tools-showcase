import { useRouter } from 'vue-router'
import { APP_PATH } from '../router'

export const useHelloWorldLogic = () => {
  const router = useRouter()

  const navigationItems = [
    {
      id: 1,
      title: 'カードめくり',
      thumbnail: 'https://images.unsplash.com/photo-1606168198738-c288d076d338?w=400',
      path: '/card-flip'
    },
    {
      id: 2,
      title: 'コンポーネントショーケース',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      path: '/showcase'
    }
  ];

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return {
    navigationItems,
    navigateTo
  };
}
