import { createStore } from 'vuex'
import { State } from 'vue'
import Config from '../config';

export default createStore({
  state(): State {
    return {
      config: new Config('')
    }
  },
  mutations: {
    setVal(state, data: { name: string; val: any }) {
      if (
        (state as any)[data.name] != undefined &&
        typeof (state as any)[data.name] == typeof data.val
      ) {
        ;(state as any)[data.name] = data.val
      }
    },
    setconfig(state, config: Config) {
      state.config = config
    }
  }
})
