import axios from 'axios';
const uploadImage = async(file) =>{
    if (!file) return ;
    try {
        const formData= new FormData();
        formData.append("upload_preset","curso-vue");
        formData.append("file",file);
        const URL = "https://api.cloudinary.com/v1_1/duphx2ezk/image/upload";
        const {data}=await axios.post(URL,formData);           
        return data.secure_url;


    }catch(error){
       // console.log(error);
       return null;
    }

}


export default uploadImage;