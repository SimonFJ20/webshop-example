import { Database } from '../database/Database';

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
};

export const getProductById = async (
    id: number,
    db: Database,
): Promise<Product> => {
    const product = await db.getProductById(id);
    if (product === null) throw new Error('product with id not found');
    return product;
};

export const addProduct = async (
    product: Product,
    db: Database,
): Promise<void> => {
    if (await db.productIdExists(product.id))
        throw new Error('product with same id already exists');
    await db.insertProduct(product);
};

export const deleteProduct = async (product: Product, db: Database) => {
    await db.deleteProductById(product.id);
};
