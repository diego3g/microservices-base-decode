import 'dotenv/config';

import { EnrollStudentToCourse } from "../../application/usecases/enroll-student-to-course"
import { PrismaCoursesRepository } from "../database/prisma/repositories/prisma-courses-repository"
import { PrismaEnrollmentsRepository } from "../database/prisma/repositories/prisma-enrollments-repository"
import { PrismaStudentsRepository } from "../database/prisma/repositories/prisma-students-repository"
import { kafka } from "./kafka/kafka"

interface PurchasesNewPurchaseMessage {
  product: {
    id: string;
    title: string;
  }
  customer: {
    name: string;
    email: string;
  }
  purchaseId: string;
}

async function main() {
  const consumer = kafka.consumer({ groupId: 'classroom-group', allowAutoTopicCreation: true })

  await consumer.connect()
  await consumer.subscribe({ topic: 'purchases.new-purchase' })

  await consumer.run({
    eachMessage: async ({ message }) => {
      const purchaseJSON = message.value?.toString();

      if (!purchaseJSON) {
        return;
      }

      const purchase: PurchasesNewPurchaseMessage = JSON.parse(purchaseJSON);

      const prismaStudentsRepository = new PrismaStudentsRepository()
      const prismaCourseRepository = new PrismaCoursesRepository()
      const prismaEnrollmentRepository = new PrismaEnrollmentsRepository()

      const enrollStudentToCourse = new EnrollStudentToCourse(
        prismaStudentsRepository,
        prismaCourseRepository,
        prismaEnrollmentRepository,
      )

      await enrollStudentToCourse.execute({
        student: {
          name: purchase.customer.name,
          email: purchase.customer.email,
        },
        course: {
          title: purchase.product.title,
          purchasesProductId: purchase.product.id,
        },
        purchasesEnrolledByPurchaseId: purchase.purchaseId,
      })

      console.log(`[Classroom] Enrolled user ${purchase.customer.name} to ${purchase.product.title}`)
    },
  })
}

main().then(() => {
  console.log('[Classroom] Listening to Kafka messages')
})