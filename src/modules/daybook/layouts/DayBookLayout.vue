<template>
    <NavBar/>
    <div v-if="isLoading" class="row justify-content-md-center">
        <div class="col-3 alert-info text-center mt-5">
            Espere por favor ...
            <h3 class="mt-2">
                <div class="fa fa-spin fa-sync"></div>
            </h3>
        </div>

    </div>
    <div class="d-flex" v-else> 
        <div class="col-4">
            <EntryList/>
        </div>
        <div class="col">
            <router-view/>
        </div>

    </div>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import  { mapActions, mapState} from 'vuex';
export default{
    components: {
    NavBar:defineAsyncComponent(()=>import('../components/Navbar')),
    EntryList:defineAsyncComponent(()=>import('../components/EntryList'))        
    },
    methods:{
     ...mapActions('journal',['loadEntries']),     
    },
    computed:{
        ...mapState('journal',['isLoading'])
    },
    created(){
     this.loadEntries();     
    }


}
</script>
