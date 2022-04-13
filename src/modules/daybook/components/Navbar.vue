<template>
    <nav class="navbar bg-primary">
    <a class="navbar-brand text-white" >
        <img src="@/assets/logo.png"  height="24" class="d-inline-block align-text-top mx-2" />
        DayBook
    </a>
    <div class="d-flex">
        <button class="btn btn-outline-info mx-2">
          {{user.name}}
<i class="fa fa-sign-out-alt"></i>
            
            </button>
    </div>
    </nav>
</template>
<script>

import {useStore} from "vuex";
import {computed} from "vue";

export default {
  setup(){
    const store=useStore();
    return {
      user:computed(()=>store.getters('auth/currentUser'))

    }
  }
}
</script>