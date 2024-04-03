import {ref, computed} from 'vue'
import {defineStore, createPinia} from 'pinia'

const pinia = createPinia();
export {pinia};

export const useUserStore =defineStore('user',()=>{
  //state
  const userData = ref(
    { isLoggedIn: true,
      userId: 'pinia',
      isSavedId: true}
  )
  //getter
  const getUserId = computed(() => userData.value.userId)
  const getIsLoggedIn = computed(() => userData.value.isLoggedIn)
  const getIsSavedIn = computed(() => userData.value.isSavedId)

  //actions
  const login = (newId) =>{
    userData.value.userId = newId;
  }
  const logout = () =>{
    userData.value.isLoggedIn = false;
    if(!userData.value.isSavedId){
      userData.value.userId = null;
    }
    console.log('logout',userData);
  }
  const savingId = (boolean) =>{
    userData.value.isSavedId = boolean;
  }


  return {userData, getUserId,getIsLoggedIn,getIsSavedIn, login, logout, savingId}
})
