import { routes } from '@/constants/routes';

export const getHrefArr = (
  routesObj: typeof routes,
  type: 'public' | 'private',
) => {
  return Object.values(routesObj[type]).map(route => route.href);
};
