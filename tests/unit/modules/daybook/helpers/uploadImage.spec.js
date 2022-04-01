import  uploadImage  from  '@/modules/daybook/helpers/uploadImage'
import axios from 'axios';

import cloudinary  from 'cloudinary'
cloudinary.config({
    cloud_name:"duphx2ezk",
    api_key:'777913715189528',
    api_secret:'FSIAeZGMNWRd1s-6XHKw2Mgzfow'
});

describe('pruebas en el uploadImage',()=>{    
   test('Debe de cargar un archivo y retornar una url',async(done)=>{
     
    const {data} =await axios.get('https://res.cloudinary.com/duphx2ezk/image/upload/v1648780112/ukkjmidwpggozacuwhz1.png',()=>{
        responseType:'arraybuffer'
    })      
    const file = new File([data], 'foto.png')    
    const url =await uploadImage(file);    

    const id="cb9rzvjlw2krjwg3rioc";
    cloudinary.v2.api.delete_resources(id, {},() => {
     done();
    });
//    console.log(url);
    expect(typeof url).toBe('object');        
   });

})