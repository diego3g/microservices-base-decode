import { StudentsRepository } from "../../../../application/repositories/students-repository";
import { Student } from "../../../../domain/student";
import { prisma } from "../prisma";

export class PrismaStudentsRepository implements StudentsRepository {
  async findByEmail(email: string): Promise<Student | null> {
    const student = await prisma.student.findUnique({
      where: {
        email,
      }
    })

    if (!student) {
      return null;
    }

    return new Student({
      name: student.name,
      email: student.email,
    }, student.id);
  }

  async create(student: Student) {
    await prisma.student.create({
      data: {
        id: student.id,
        name: student.name,
        email: student.email,
      }
    })
  }
}