import { Product } from '../products/Product';

export interface Database {
    productIdExists(id: number): Promise<boolean>;
    getProductById(id: number): Promise<Product | null>;
    insertProduct(product: Product): Promise<Product>;
    deleteProductById(id: number): Promise<void>;
}
