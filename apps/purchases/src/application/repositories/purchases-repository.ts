import { Purchase } from "../../domain/purchase";

export interface PurchasesRepository {
  create(purchase: Purchase): Promise<void>;
}