import { TestDatabase } from '../database/TestDatabase';
import { addProduct, getProductById, Product } from './Product';

const makeTestProduct = (): Product => ({
    id: 0,
    name: 'test',
    description: 'this is a test',
    price: 0,
});

describe('addProduct', () => {
    it('should add product to database', async () => {
        const db = new TestDatabase();
        const product = makeTestProduct();
        await addProduct(product, db);
        expect(await db.getProductById(0)).toEqual(product);
    });

    it('should disallow id duplicates', async () => {
        expect.assertions(1);
        const db = new TestDatabase();
        const product = makeTestProduct();
        const product2 = makeTestProduct();
        await addProduct(product, db);
        try {
            await addProduct(product2, db);
        } catch (c) {
            expect((c as Error).message).toBe(
                'product with same id already exists',
            );
        }
    });
});

describe('getProductById', () => {
    it('should return product with same id', async () => {
        const db = new TestDatabase();
        const product = makeTestProduct();
        await db.insertProduct(product);
        expect(await getProductById(product.id, db)).toEqual(product);
    });

    it('should return the product with the same id', async () => {
        const db = new TestDatabase();
        const product = makeTestProduct();
        const product2 = { ...makeTestProduct(), id: 1 };
        await db.insertProduct(product);
        await db.insertProduct(product2);
        expect(await getProductById(product2.id, db)).toEqual(product2);
    });

    it('should throw when not found', async () => {
        expect.assertions(1);
        const db = new TestDatabase();
        try {
            await getProductById(0, db);
        } catch (c) {
            expect((c as Error).message).toBe('product with id not found');
        }
    });
});
