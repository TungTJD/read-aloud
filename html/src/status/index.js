import { useMain, useStore, useLogin } from "../status/store";
import { useCounterStore } from "../status/counter";

const appStore = {};

export const registerStore  = () => {
  appStore.useMain = useMain();
  appStore.useStore = useStore();
  appStore.useCounterStore = useCounterStore();
  appStore.useLogin = useLogin();
}

export default appStore
