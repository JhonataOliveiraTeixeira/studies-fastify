import z from "zod";
import { eq } from 'drizzle-orm'
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const  getCourseByIdRoute: FastifyPluginAsyncZod = async function (server ) {
  server.get('/courses/:id', {
    schema: {
      tags: ['Courses'],
      summary: 'Get course by id',
      params: z.object({
        id: z.string().uuid()
      }),
      response: {
        200: z.object({
          id: z.string().uuid(),
          title: z.string(),
          description: z.string().nullable()
        }),
        404: z.object({
          error: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const courseId = request.params.id

    const course = await db.select().from(courses).where(eq(courses.id, courseId))

    if (!course) {
      return reply.status(404).send({ error: "Course not found" })
    }

    return course[0]
  })
}