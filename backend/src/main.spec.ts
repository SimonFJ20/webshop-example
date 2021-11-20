import { sum } from "./main";

describe('main', () => {

    it('should return 5', () => {
        expect(sum(3, 2)).toBe(5);
    });

});
