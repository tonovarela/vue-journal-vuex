<template>
<div v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{ day }}</span>
            <span class="mx-1 fs-3">{{ month }}</span>
            <span class="mx-2 fs-4 fw-light">
                {{ year }}
            </span>
        </div>

        <div> 

            <input accept="image/png, image/jpeg" v-show="false" ref="ImageSelector" type="file"  @change="onSelectedImage"   />
            <button  v-if="entry.id" @click="onDeleteEntry" class="btn btn-danger mx-2">
                Borrar
                <i class="fa fa-trash-alt"></i>
            </button>
            <button  @click="onSelectImage" class="btn btn-primary">
                Subir foto
                <i class="fa fa-upload"></i>
            </button>
        </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
        <textarea v-model="entry.text" class="form-control" placeholder="¿Que sucedio hoy?"></textarea>
    </div>
</div>

<img v-if="entry.picture && !localImage" :src="entry.picture" />

<img v-if="localImage" :src="localImage" class="img-thumbail" alt="entry-picture" />

<Fab icon="fa-save" @on:click="saveEntry"></Fab>
</template>

<script>
import {
    defineAsyncComponent
} from "vue";
import {
    mapGetters,
    mapActions
} from 'vuex';

import getDayMothYear from '../helpers/getDayMothYear'
import Swal from 'sweetalert2';
import uploadImage  from '../helpers/uploadImage';


export default {
    components: {
        Fab: defineAsyncComponent(() => import("../components/Fab")),
    },
    props: {
        id: {
            type: String,
            required: true
        },
    },

    data() {
        return {
            entry: null,
            localImage:null,
            file:null
        }
    },

    computed: {
        ...mapGetters('journal', ['getEntriesById']),

        day() {
            const {
                day
            } = getDayMothYear(this.entry.date)
            return day;
        },
        month() {
            const {
                month
            } = getDayMothYear(this.entry.date)
            return month;
        },
        year() {
            const {
                year
            } = getDayMothYear(this.entry.date)
            return year;
        }
    },
    methods: {
        ...mapActions('journal', ['updateEntry', 'createEntry','deleteEntry']),
        async saveEntry() {
            new Swal({
             title:"Espere por favor",
             allowOutsideClick:false
            });
            Swal.showLoading();
            this.entry.picture=await uploadImage(this.file);             
            if (this.id == "new") {
                await this.createEntry(this.entry);
                const id = this.entry.id;
                this.$router.push({
                    name: 'entry',
                    params: {
                        id
                    }
                })

            } else {
                this.updateEntry(this.entry);
            }
            Swal.fire('Guardado','Entrada registrada con exito','success');
            this.localImage= null;

        },

        async onDeleteEntry() {  
            
            const {isDenied} = await Swal.fire({
                title:"Esta seguro?",
                text:"Una vez borrado, no se puede recuperar",
                showDenyButton:true,
                confirmButtonText:"Si, estoy seguro"
            });
            if (isDenied){
                return;
            }
            new Swal({
                title:"Espere por favor",
                allowOutsideClick:false,
            });
            Swal.showLoading();
             await this.deleteEntry(this.entry.id)
             this.$router.push({
                 name:'no-entry'
             });  
             Swal.fire('Eliminado','Entrada eliminada con exito','success');           

        },
        onSelectImage(){
             this.$refs.ImageSelector.click();
        },  
        onSelectedImage(event){
            const [file]= event.target.files;
          if (!file){              
              return;
          }                
          this.file= file;
           const fr = new FileReader();
           fr.onload =() =>this.localImage =fr.result;           
          fr.readAsDataURL(file);
        },
        loadEntry() {
            let entry = {};
            if (this.id === "new") {
                entry = {
                    text: "",
                    date: new Date().getTime()
                }
            } else {
                entry = this.getEntriesById(this.id);
            }
            if (!entry) return this.$router.push({
                name: 'no-entry'
            });
            this.entry = entry;
        }
    },
    created() {
        this.loadEntry()
    },
    watch: {
        id() {
            this.loadEntry()
        }
    }
};
</script>

<style lang="scss" scoped>
textarea {
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus {
        outline: none;
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
