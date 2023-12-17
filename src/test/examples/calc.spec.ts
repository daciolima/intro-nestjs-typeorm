export function add(x: number, y: number) {
    return x + y
}


describe('Espera-se um retorno int', () => {
    test('add function', () => {
        expect(add(1, 2)).toEqual(3)
    });
})