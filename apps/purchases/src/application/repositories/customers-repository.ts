import { Customer } from "../../domain/customer";

export interface CustomersRepository {
  create(customer: Customer): Promise<void>;
}