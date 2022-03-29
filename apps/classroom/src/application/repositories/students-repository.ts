import { Student } from "../../domain/student";

export interface StudentsRepository {
  findByEmail(email: String): Promise<Student | null>;
  create(student: Student): Promise<void>;
}