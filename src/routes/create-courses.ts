import z from "zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import type{ FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const  createCourseRoute: FastifyPluginAsyncZod = async function (server ) {
  server.post('/courses', {
    schema:{
      tags: ['Courses'],
      summary: 'Create course',
      body: z.object({
        title: z.string().min(5, "Title must be at least 5 characters long")
      }),
      response: {
        201: z.object({
          id: z.string().uuid()
        }),
        400: z.object({
          error: z.string()
        })
      }
    }
  }, async (request, reply)=>{
  
    const body = request.body
    const courseTitle = body.title as string
    
    if(!courseTitle) {
      return reply.status(400).send({error: "Title is required"})
    }
  
    const result = await db
    .insert(courses)
    .values({
      title: courseTitle
    })
    .returning()
  
    return {id: result[0].id}
  
  })
}