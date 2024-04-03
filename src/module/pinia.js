
import {defineStore, createPinia} from 'pinia'

const pinia = createPinia();
export {pinia};

export const useUserStore = defineStore('user', {
  state: () => ({ 
    isLoggedIn: true,
    userId: 'pinia',
    isSavedId: true
  }),
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getUserId: (state) => state.userId,
    getIsSavedId: (state) => state.isSavedId,
  },
  actions: {
    login(newId) {
      this.userId = newId;
    },
    logout() {
      this.isLoggedIn = false;
      if(this.isSavedId){
        this.userId = null;
      }
    },
    savingId(boolean){
        this.isSavedId = boolean;
    },
  },
  
  // persist : {
  //     enabled: true,
  //     strategies: [
  //       { key: 'user',storage: localStorage, paths: ['userId'] }
  //     ],
  // }

})