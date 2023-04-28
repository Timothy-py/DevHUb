import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum'
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import {Developer} from '../src/developer/entities/developer.entity'
import { Repository } from 'typeorm';

const PORT = process.env.PORT

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
    describe('Get empty developers', ()=>{
      it('should return empty arrays', () => {
        return pactum
        .spec()
        .get('/api/v1/developers')
        .expectStatus(200)
        .expectBody([])
        })
      })
  })
});
