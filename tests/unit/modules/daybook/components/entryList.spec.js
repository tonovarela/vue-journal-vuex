
import { createStore } from 'vuex';

import { shallowMount } from '@vue/test-utils'
import EntryList from '@/modules/daybook/components/EntryList.vue'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state';



describe('Pruebas en el Entry List', () => {

    const createVuexStore = (inicialState) => createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...inicialState }
            }
        }
    })

    let wrapper;
    let mockRouter;

    beforeEach(() => {
        const store = createVuexStore(journalState);
         mockRouter = {
            push: jest.fn()
        }

        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })

    })


    test('Debe de llamar el getEntriesByTerm sin termino y mostrar 2 entradas', () => {
        expect(wrapper.findAll('entry-stub').length).toBe(3);
        expect(wrapper.html()).toMatchSnapshot();
    })

    test('Debe de llamar el getEntriesByTerm y filtrar las entradas', async() => {
        const input = wrapper.find('input')
        await input.setValue('Entrada');
        expect(wrapper.findAll('entry-stub').length).toBe(2);

    })
    test('El boton de nuevo debe de direccionar a new',()=>{
        wrapper.find("button").trigger('click')
        expect(mockRouter.push).toHaveBeenCalledWith({
            name:'entry',params:{id:'new'}
        })
    })
})