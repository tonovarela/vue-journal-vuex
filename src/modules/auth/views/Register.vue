<template>
  <span class="login100-form-title p-b-41">Registro</span> -->
  <form @submit.prevent="registrar" class="login100-form validate-form p-b-33 p-t-5">
    <div class="wrap-input100 validate-input" data-validate="Enter username">
      <input class="input100"  v-model="userForm.name" type="text" placeholder="Usuario" required />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>
    <div class="wrap-input100 validate-input" data-validate="Enter email">
      <input class="input100" v-model=userForm.email type="email" placeholder="Correo" required />
      <span class="focus-input100" data-placeholder="&#xe818;"></span>
    </div>
    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        class="input100"
        v-model="userForm.password"
        type="password"
        placeholder="Contraseña"
        required
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>
    <div class="container-login100-form-btn m-t-32">
      <button type="submit" class="login100-form-btn">Crear cuenta</button>
    </div>
    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{name:'login'}">¿Ya tienes una cuenta?</router-link>
    </div>
  </form>
</template>
<script>
import { ref } from "vue";
import useAuth from "../composables/useAuth";

import {useRouter} from "vue-router";
import Swal from "sweetalert2";



export default {
  setup(){
    const { createUser} = useAuth()
    const router= useRouter();
    const userForm = ref({
      email:'mestelles@litoprocess.com',
      name:'varela',
      password:'123'
    });
    const registrar  = async()=>{
      const  {ok,message} = await createUser(userForm.value)    
      if (!ok){
        Swal.fire('Error',message,'error')
        return
      }
       router.push({name: 'no-entry'})
    }
    return {
        userForm,
        registrar
    }
    

  }
};
</script>

<style>
</style>



