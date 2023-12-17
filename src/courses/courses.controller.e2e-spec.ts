import 'dotenv/config'

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Course } from './courses.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Tag } from './tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses.module';
import request from 'supertest'


describe('CoursesController e2e tests', () => {


  let app: INestApplication // Pegando a aplicação para simular teste
  
  let module: TestingModule

  let data: any // Dados

  let courses: Course[] // Array de courses

  const dataSourceTest: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_POST_TEST),
    username: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWD_TEST,
    database: process.env.DB_NAME_TEST,

    // Entities envolvidas
    entities: [Course, Tag],

    // Observa as entities e cria automaticamente as tabelas/campos
    synchronize: true
  }


  beforeAll(async () => {
    module: await Test.createTestingModule({
      imports: [
        CoursesModule,

        // Conexão do módulo. O que será construido.
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceTest
          }
        })
      ]
    }).compile();

    // Criando uma instância da aplicação
    app = module.createNestApplication();
    await app.init()

    data = {
      name: 'Node JS',
      description: 'Node.js',
      tags: ['nodejs', 'nestjs'],
    }
  
  });

  // Antes de cada teste
  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceTest).initialize()
    const repository = dataSource.getRepository(Course)

    // carrega sempre uma lista de courses para teste
    courses = await repository.find()

    // Desfazendo conexão.
    await dataSource.destroy()
  })

  afterAll(async () => {
    await module.close()
  })

  // Teste e2e para rota POST
  describe('POST /courses', () => {
    it('should create a course', async () => {

      // Gerando request POST na instância da aplicação(app.getHttpServer)
      const res = await request(app.getHttpServer())
        .post('/courses')
        .send(data)
        .expect(201)
      expect(res.body.id).toBeDefined()
      expect(res.body.name).toEqual(data.name)
      expect(res.body.description).toEqual(data.description)
      expect(res.body.created_at).toBeDefined()
      expect(res.body.tags[0].name).toEqual(data.tags[0])
      expect(res.body.tags[1].name).toEqual(data.tags[1])
    })
  })

  // Teste e2e para rota GET
  describe('GET /courses', () => {
    it('should list all courses', async () => {
      const res = await request(app.getHttpServer()).get('/courses').expect(200)
      expect(res.body[0].id).toBeDefined()
      expect(res.body[0].name).toEqual(data.name)
      expect(res.body[0].description).toEqual(data.description)
      expect(res.body[0].created_at).toBeDefined()
      res.body.map(item =>
        expect(item).toEqual({
          id: item.id,
          name: item.name,
          description: item.description,
          created_at: item.created_at,
          tags: [...item.tags],
        }),
      )
    })
  })

  // Teste e2e para rota GET/id
  describe('GET /courses/:id', () => {
    it('should gets a course by id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/courses/${courses[0].id}`)
        .expect(200)
      expect(res.body.id).toEqual(courses[0].id)
      expect(res.body.name).toEqual(courses[0].name)
      expect(res.body.description).toEqual(courses[0].description)
    })
  })

  // Teste e2e para rota PUT/id 
  describe('PUT /courses/:id', () => {
    it('should update a course', async () => {
      const updateData = {
        name: 'new name',
        description: 'new description',
        tags: ['one', 'two'],
      }

      const res = await request(app.getHttpServer())
        .put(`/courses/${courses[0].id}`)
        .send(updateData)
        .expect(200)
      expect(res.body.id).toEqual(courses[0].id)
      expect(res.body.name).toEqual('new name')
      expect(res.body.description).toEqual('new description')
      expect(res.body.tags).toHaveLength(2)
      expect(res.body.tags[0].name).toEqual('one')
      expect(res.body.tags[1].name).toEqual('two')
    })
  })

  // Teste e2e para rota REMOVE/id 
  describe('DELETE /courses/:id', () => {
    it('should delete a course', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/courses/${courses[0].id}`)
        .expect(204)
        .expect({})
    })
  })

});
