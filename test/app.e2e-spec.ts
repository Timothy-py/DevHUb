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
  
  
  describe('Developer Service', () => {

    // *********Return empty array ***********
    describe('Get empty developers', ()=>{
      it('should return empty arrays', () => {
        return pactum
        .spec()
        .get(`${BASE_ROUTE}/developers`)
        .expectStatus(200)
        .expectBody([])
        })
      })

    const dto = [
      {
        email: 'test1@gmail.com',
        name: 'test1',
        level: 'junior'
      },
      {
        email: 'test4@gmail.com',
        name: 'test4',
        level: 'junior'
      },
      {
        email: 'test3@gmail.com',
        name: 'test3',
        level: 'senior'
      }
    ]

    // *********PASS: Create Developers**********
    // dto.forEach(obj => {
      describe('Create a Developer', ()=>{
        it('should create a developer', ()=>{
          return pactum
            .spec()
            .post(`${BASE_ROUTE}/developers`)
            .withBody(dto[1])
            .expectStatus(201)
            .stores('email', 'email')
            .inspect()
        })
      })
    // });

    // *********FAIL: Create a developer**********
    describe('Don\'t create a developer', ()=>{
      let dto2 = dto[1]
      dto2.email = '$S{email}'

      it('should not create a developer', ()=>{
        return pactum
          .spec()
          .post(`${BASE_ROUTE}/developers`)
          .withBody(dto2)
          .expectStatus(409)
      })
    })

    // ********* Fetch all developers **********
    describe('Fetch all developers', ()=>{
      it('should get all developers', ()=>{
        return pactum
          .spec()
          .get(`${BASE_ROUTE}/developers`)
          .expectStatus(200)
          .expectJsonLength(1)
      })
    })

    // ********Fetch developers by level **********
    describe('Fetch all senior developers', ()=>{
      it('should get all senior developers', ()=>{
        return pactum
          .spec()
          .get(`${BASE_ROUTE}/developers/filter?level=senior`)
          .expectStatus(200)
          .expectBody([])
      })
    })


  })
});
