
<template>
  <nav class="navbar bg-primary">
    <a class="navbar-brand text-white">
      <img
        src="@/assets/logo.png"
        height="24"
        class="d-inline-block align-text-top mx-2"
      />
      DayBook
    </a>
    <div class="d-flex">
      <button @click="onlogOut" class="btn btn-outline-info mx-2">
        <i class="fa fa-sign-out-alt"></i>
         {{userName}}
      </button>
    </div>
  </nav>
</template>
<script>
import useAuth from '@/modules/auth/composables/useAuth';
import { useRouter } from 'vue-router';
export default {
     setup(){
      const router = useRouter(); 
     const {userName,logOut} = useAuth();

     return {
       userName,
       onlogOut:()=>{
         router.push({name:'login'});
         logOut();
       }

     }
  
     }
};
</script>