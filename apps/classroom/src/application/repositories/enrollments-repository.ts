import { Enrollment } from "../../domain/enrollment";

export interface EnrollmentsRepository {
  create(enrollment: Enrollment): Promise<void>;
}