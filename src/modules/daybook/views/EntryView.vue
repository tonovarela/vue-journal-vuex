
<template>
  <div class="entry-title  d-flex justify-content-between p-2  ">
    <div>
      <span class="text-success fs-3 fw-bold">15</span>
      <span class="mx-1 fs-3 ">Julio</span>
      <span class="mx-2 fs-4 fw-light">2021, jueves</span>
    </div>

    <div>
      <button class="btn btn-danger mx-2">Borrar
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="btn btn-primary ">Subir foto
        <i class="fa fa-upload"></i>
      </button>
    </div>

  </div>

  <hr>
  <div class="d-flex flex-column px-3 h-75" >
    <textarea class="form-control" placeholder="¿Que sucedio hoy?" ></textarea>
  </div>
  <img src="https://media.istockphoto.com/photos/summer-garden-picture-id92624397?k=20&m=92624397&s=612x612&w=0&h=FmfX6TyaIm2faGiUgDIjfIlUvRTV0DXhN3MM7kw-GHY="  class="img-thumbail" alt ="entry-picture"/>
  <Fab icon="fa-save"></Fab>
  

</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
components:{
  Fab:defineAsyncComponent(()=>import('../components/Fab'))
}
}
</script>

<style lang="scss" scoped>
textarea{
  font-size: 20px;
  border:none;
  height: 100%;
  &:focus {
    outline:none;

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