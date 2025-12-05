import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createCourseRoute } from "./create-courses.ts";
import { getCourseByIdRoute } from "./get-course-by-id.ts";
import { getCoursesRoute } from "./get-courses.ts";

export const routes: FastifyPluginAsyncZod[] = [
  getCoursesRoute,
  getCourseByIdRoute,
  createCourseRoute
]