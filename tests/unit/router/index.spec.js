
import daybookRouter from '@/modules/daybook/router'
describe('Pruebas en el router module del Daybook', () => {
    test('El router debe de tener esta configuracion', () => {
        expect(daybookRouter).toMatchObject({
            name: 'daybook',
            component: expect.any(Function),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any(Function)
                },
                {
                    path: ':id',
                    name: "entry",
                    component: expect.any(Function),
                    props:expect.any(Function)
                }

            ]
        })

    })
})