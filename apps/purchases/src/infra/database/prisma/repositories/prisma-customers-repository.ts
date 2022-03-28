import { CustomersRepository } from "../../../../application/repositories/customers-repository";
import { Customer } from "../../../../domain/customer";
import { prisma } from "../prisma";

export class PrismaCustomersRepository implements CustomersRepository {
  async create(customer: Customer) {
    await prisma.customer.create({
      data: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      }
    })
  }
}