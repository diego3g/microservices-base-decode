import { Course } from "../../domain/course";
import { Enrollment } from "../../domain/enrollment";
import { Student } from "../../domain/student";
import { CoursesRepository } from "../repositories/courses-repository";
import { EnrollmentsRepository } from "../repositories/enrollments-repository";
import { StudentsRepository } from "../repositories/students-repository";

interface EnrollStudentToCourseRequest {
  student: {
    name: string;
    email: string;
  }
  course: {
    title: string;
    purchasesProductId: string;
  }
  purchasesEnrolledByPurchaseId?: string;
}

export class EnrollStudentToCourse {
  constructor(
    private studentsRepository: StudentsRepository,
    private coursesRepository: CoursesRepository,
    private enrollmentsRepository: EnrollmentsRepository,
  ) {}

  async execute(request: EnrollStudentToCourseRequest): Promise<void> {
    let course = await this.coursesRepository.findByPurchasesProductId(request.course.purchasesProductId);

    if (!course) {
      course = new Course({
        title: request.course.title,
        purchasesProductId: request.course.purchasesProductId,
      })

      await this.coursesRepository.create(course)
    }

    let student = await this.studentsRepository.findByEmail(request.student.email);

    if (!student) {
      student = new Student({
        name: request.student.name,
        email: request.student.email,
      })

      await this.studentsRepository.create(student)
    }

    const enrollment = new Enrollment({
      courseId: course.id,
      studentId: student.id,
      createdAt: new Date(),
      purchasesEnrolledByPurchaseId: request.purchasesEnrolledByPurchaseId,
    })

    await this.enrollmentsRepository.create(enrollment);
  }
}