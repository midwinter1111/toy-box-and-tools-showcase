import { APP_PATH } from "@/router";
import { Router } from "vue-router";

export const executeFirstAccess = async (router: Router): Promise<void> => {
  router.push(APP_PATH.ROOT);
};
