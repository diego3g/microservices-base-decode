import { PurchasesRepository } from "../../../../application/repositories/purchases-repository";
import { Purchase } from "../../../../domain/purchase";
import { prisma } from "../prisma";

export class PrismaPurchasesRepository implements PurchasesRepository {
  async create(purchase: Purchase) {
    await prisma.purchase.create({
      data: {
        id: purchase.id,
        customerId: purchase.customerId,
        productId: purchase.productId,
        createdAt: purchase.createdAt,
      }
    })
  }
}