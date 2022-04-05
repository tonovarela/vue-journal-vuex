import {shallowMount} from  '@vue/test-utils';
import Entry from '@/modules/daybook/components/Entry.vue';
import { journalState } from '../../../mock-data/test-journal-state';

describe('Pruebas en el Entry component',()=>{
  const mockRouter = {
      push:jest.fn()
  }
  const wrapper = shallowMount(Entry , {
    props:{
        entry:journalState.entries[0]
    },
    global: {
        mocks:{
            $router: mockRouter
        }
    }
  })
    test('Debe de hacer match con el snapshot',()=>{
           expect(wrapper.html()).toMatchSnapshot();
    })
    test('Debe de redireccionar al hacer click en el entry-container',()=>{
          const entryContainer = wrapper.find('.entry-container')
          entryContainer.trigger('click');
          expect(mockRouter.push).toHaveBeenCalledWith({
              name:'entry',
              params: {
                  id:journalState.entries[0].id
              }
          })
    })

    test('Pruebas en las propiedades computadas',()=>{

        expect(wrapper.vm.day).toBe(25);
        expect(wrapper.vm.month).toBe('Marzo');
        expect(wrapper.vm.yearDay).toBe(' 2022 Viernes ');

    })

});