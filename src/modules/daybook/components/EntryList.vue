<template>
<div class="entry-list-container">
    <div class="px-x2 pt-2 ">
        <input type="text"  v-model="term" class="form-control" placeholder="Buscar entrada" />
    </div>

<div class="mt-2 d-flex flex-column" >
    <button class="btn btn-primary mx-3" @click="$router.push({name:'entry',params:{id:'new'}})" >
        <i class="fa fa-plus-circle"></i>  
        Nueva entrada
    </button>

</div>

    <div class="entry-scollarea">
        <Entry v-for="entry in  entriesByTerm"  :entry="entry" :key="entry.id"></Entry>
    </div>
   </div>
</template>

<script>
import {  defineAsyncComponent } from 'vue'
import  { mapGetters} from 'vuex'
export default {
    components:{
       Entry: defineAsyncComponent(()=>import("./Entry")) 
    },
    computed: {
        ...mapGetters('journal',['getEntriesByTerm']),
          entriesByTerm(){              
           return this.getEntriesByTerm(this.term)
        }
    },
    data() {
        return {
            term:''
        }
    }

}
</script>

<style lang="scss" scoped>
.entry-list-container {
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 20px);
}

.entry-scrollarea {
   // height: calc(100vh - 110px);
    overflow: scroll;
}
</style>
