import {fastify} from 'fastify'
import apiReference from '@scalar/fastify-api-reference' 
import {  jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import { } from 'drizzle-kit'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { routes } from './src/routes/routes.ts'


export const server = fastify({
  logger:{
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      }}
  }
}).withTypeProvider<ZodTypeProvider>()

if (process.env.NODE_ENV !== 'production') {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Estudos Fastify",
        description: "API de estudos com Fastify",
        version: "1.0.0"
      },
    },
    transform: jsonSchemaTransform
  })


  server.register(apiReference, {
    routePrefix: '/docs',
  })
}



server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

// Código correto:
routes.forEach(route => {
  server.register(route);
});


const port  = Number(process.env.PORT) || 3000

server.listen({ port: port || 3333})