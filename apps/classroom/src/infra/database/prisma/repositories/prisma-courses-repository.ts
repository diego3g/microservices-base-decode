import { CoursesRepository } from "../../../../application/repositories/courses-repository";
import { Course } from "../../../../domain/course";
import { prisma } from "../prisma";

export class PrismaCoursesRepository implements CoursesRepository {
  async findByPurchasesProductId(purchasesProductId: string): Promise<Course | null> {
    const course = await prisma.course.findUnique({
      where: { purchasesProductId },
    })

    if (!course) {
      return null;
    }

    return new Course({
      title: course.title,
      purchasesProductId: course.purchasesProductId,
    }, course.id);
  }

  async create(course: Course): Promise<void> {
    await prisma.course.create({
      data: {
        id: course.id,
        title: course.title,
        purchasesProductId: course.purchasesProductId,
      },
    })
  }
}