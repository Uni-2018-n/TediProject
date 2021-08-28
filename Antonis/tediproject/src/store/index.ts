import { createStore } from 'vuex'

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
  }
})