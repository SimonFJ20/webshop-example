import { Product } from '../products/Product';
import { Database } from './Database';

export class TestDatabase implements Database {
    private products: Product[] = [];

    async productIdExists(id: number): Promise<boolean> {
        return this.products.find((p) => p.id == id) !== undefined;
    }

    async getProductById(id: number): Promise<Product | null> {
        return this.products.find((p) => p.id == id) ?? null;
    }

    async insertProduct(product: Product): Promise<Product> {
        this.products.push(product);
        return product;
    }

    async deleteProductById(id: number): Promise<void> {
        return this.products.forEach(
            (v, i, products) => v.id === id && products.splice(i, 1),
        );
    }
}
