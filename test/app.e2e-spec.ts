import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum'
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import {Developer} from '../src/developer/entities/developer.entity'
import { Repository } from 'typeorm';

const PORT = process.env.PORT
const BASE_ROUTE = '/api/v1'

// Nest Application Build Up Logic for Testing
describe('AppController (E2E)', () => {
  let app: INestApplication;
  let developerRepository: Repository<Developer>;

  // Connect DB and get Providers
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ AppModule ],
      providers: [{
        provide: getRepositoryToken(Developer),
        useClass: Repository
      }]
    }).compile();

    app = moduleFixture.createNestApplication();
    developerRepository = moduleFixture.get<Repository<Developer>>(getRepositoryToken(Developer))
  
    await app.init();
    await app.listen(PORT)
    
    
    pactum.request.setBaseUrl(`http://localhost:${PORT}`)
  });

  // TEAR DOWN LOGIC
  afterAll(async () => {
    // clear all data in Developer table
    await developerRepository.clear();
    app.close();
  })
  
  // *********Return empty array ***********
  describe('Developer Service', () => {
    describe('Get empty developers', ()=>{
      it('should return empty arrays', () => {
        return pactum
        .spec()
        .get(`${BASE_ROUTE}/developers`)
        .expectStatus(200)
        .expectBody([])
        })
      })

  // *********PASS: Create a developer**********
    describe('Create a Developer', ()=>{
      const dto = {
        email: 'test1@gmail.com',
        name: 'test1',
        level: 'junior'
      }

      it('should create a developer', ()=>{
        return pactum
          .spec()
          .post(`${BASE_ROUTE}/developers`)
          .withBody(dto)
          .expectStatus(201)
          .stores('devId', 'id')
          // .inspect()
      })
    })


  })
});
