
import {shallowMount} from '@vue/test-utils';
import Home from '@/views/Home'

describe('Pruebas en el about Home',()=>{
    test('Debe de renderizar el componente correctamente',()=>{
       
        const wrapper  = shallowMount(Home)
        expect(wrapper.html()).toMatchSnapshot();

    });

    test('Al hacer click en el boton debe de redireccionar a No-Entry',()=>{
        const mockRouter =  {
            push : jest.fn()
        }
        const wrapper = shallowMount(Home, {
            global: {
                mocks:{
                    $router:mockRouter
                }
            }
        });
        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({name:'no-entry'})
        

    })
})