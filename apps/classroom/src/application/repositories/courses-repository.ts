import { Course } from "../../domain/course";

export interface CoursesRepository {
  findByPurchasesProductId(purchasesProductId: string): Promise<Course | null>;
  create(course: Course): Promise<void>;
}