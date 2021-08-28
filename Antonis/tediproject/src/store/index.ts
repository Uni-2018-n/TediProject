import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
  state () {
    return {
      flag: false,
      user: {
        // flag: Boolean,
        // token: String,
        // firstname: String,
        // lastname: String,
        // ProfilePic: String,
      }
    }
  },
  plugins: [createPersistedState()],
})