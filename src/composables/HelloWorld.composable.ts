import { useRouter } from 'vue-router'
import { APP_PATH } from '../router'

export const useHelloWorldLogic = () => {
  const router = useRouter()

  const navigationItems = [
    {
      id: 1,
      title: 'カードめくり',
      thumbnail: '../assets/home-content/thumbnail-card-flip.png',
      path: APP_PATH.CARD_FLIP
    },
    {
      id: 2,
      title: 'コンポーネントショーケース',
      thumbnail: '../assets/home-content/thumbnail-component-showcase.jpg',
      path: APP_PATH.COMPONENT_SHOWCASE
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
