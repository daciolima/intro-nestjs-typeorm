import { randomUUID } from 'crypto';
import { CoursesService } from './courses.service';
import { CreateCourseDTO, UpdateCourseDTO } from './courses.dto';

describe('CoursesService unit test', () => {
  let service: CoursesService;

  let id: string
  let created_at: Date
  let updated_at: Date

  let expectOutputTags : any
  let expectOutputCourses : any
  let mockCourseRepository : any
  let mockTagRepository : any

  // beforeEach: Antes de cada teste essa função é executada.
  // beforeAll: Antes de todos os testes essa função é executada. Ex: Abertura de banco de dados.
  // afterEach: Depois de cada teste essa função é executada.
  // beforeAll: Depois de todos os testes essa função é executada. Ex: Fechamento de banco de dados.

  beforeEach(async () => {
    service = new CoursesService();

    id = randomUUID()
    created_at = new Date()
    updated_at = new Date()

    expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at, 
        updated_at
      }
    ]

    expectOutputCourses = {
      id,
      name: 'test',
      description: 'test description',
      created_at,
      updated_at,
      tags: expectOutputTags
    }

    mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses))
    }

    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn()

    }

  });

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  // Test Create
  it('should create a course', async ()  => {
    
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
   //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const createCourseDTO: CreateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs'],
    } 

    const newCourse = await service.create(createCourseDTO)

    expect(mockCourseRepository.save).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(newCourse)

  })


  // Test findAll
  it('should findall course', async ()  => {

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const courses = await service.findAll()

    expect(mockCourseRepository.find).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(courses)

  })


  // Test findOne
  it('should findOne course', async ()  => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const course = await service.findOne(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)

  })


  // Test findOne
  it('should findOne course', async ()  => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const course = await service.findOne(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)

  })

  // Test Update
  it('should update a course', async ()  => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const updateCourseDTO: UpdateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs'],
    } 

    const course = await service.update(id, UpdateCourseDTO)

    expect(mockCourseRepository.save).toHaveBeenCalled()
    expect(mockCourseRepository.preload).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)

  })



  // Test remove
  it('should delete course', async ()  => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const course = await service.remove(id)

    expect(mockCourseRepository.findOne).toHaveBeenCalled()
    expect(mockCourseRepository.remove).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(course)

  })





});
