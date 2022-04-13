

import { createStore } from 'vuex';
import { shallowMount } from '@vue/test-utils'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state';
import EntryView from '@/modules/daybook/views/EntryView.vue';
import Swal from 'sweetalert2';


jest.mock('sweetalert2',()=>({
    fire: jest.fn(),
    showLoading:jest.fn(),
    close: jest.fn()
}))
describe('Pruebas en el EntryView',()=>{
    const createVuexStore = (inicialState) => createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...inicialState }
            }
        }
    })
    const store = createVuexStore(journalState);
    let wrapper;
    let mockRouter;
    beforeEach(() => {    
         mockRouter = {
            push: jest.fn()
        }
         jest.clearAllMocks()
        wrapper = shallowMount(EntryView, {
            props:{
                id:'-Mz2XELbKHLiTt97ay1g'
                },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })   
    // test('Debe de sacar el usuario por que el id no existe',()=>{        
    //     const wrapper = shallowMount(EntryView, {        
    //         props:{
    //             id:'dsfdsf'
    //             },
    //         global: {        
    //             mocks: {
    //                 $router: mockRouter
    //             },
    //             plugins: [store]
    //         }
    //     })

    //     expect(mockRouter.push).toHaveBeenCalledWith({name:'no-entry'})

    // })
    test('Debe de mostrar la entrada correctamente',()=>{
        expect(wrapper.html()).toMatchSnapshot();
        expect(mockRouter.push).not.toHaveBeenCalledWith()
    })

    test('Debe de borrar la entrada y salir',(done)=>{
        Swal.fire.mockReturnValueOnce( Promise.resolve({isConfirmed:true}))
        wrapper.find('.btn-danger').trigger('click')

       expect(Swal.fire).toHaveBeenCalledWith({
        title: "Esta seguro?",
        text: "Una vez borrado, no se puede recuperar",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro"
    })  
    // setTimeout(()=>{
    //     expect(mockRouter.push).toHaveBeenCalled()
    //     done()
    // },2000)

    

    })

})