import { useRouter } from 'vue-router'
import { APP_PATH } from '../router'

export const useHelloWorldLogic = () => {
  const router = useRouter()

  const navigationItems = [
    {
      id: 1,
      title: 'カードめくり',
      thumbnail: '/assets/home-content/thumbnail-card-flip.png',
      path: APP_PATH.CARD_FLIP
    },
    {
      id: 2,
      title: 'コンポーネントショーケース',
      thumbnail: '/assets/home-content/thumbnail-component-showcase.jpg',
      path: APP_PATH.COMPONENT_SHOWCASE
    },
    {
      id: 3,
      title: '開発中',
      thumbnail: '/assets/home-content/now-loading.jpeg',
      path: APP_PATH.ERROR
    },
    {
      id: 4,
      title: '開発中',
      thumbnail: '/assets/home-content/now-loading.jpeg',
      path: APP_PATH.ERROR
    },
    {
      id: 5,
      title: '開発中',
      thumbnail: '/assets/home-content/now-loading.jpeg',
      path: APP_PATH.ERROR
    },
    {
      id: 6,
      title: '開発中',
      thumbnail: '/assets/home-content/now-loading.jpeg',
      path: APP_PATH.ERROR
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
