import { Product } from "../../domain/product";

export interface ProductsRepository {
  findById(id: string): Promise<Product | null>;
}