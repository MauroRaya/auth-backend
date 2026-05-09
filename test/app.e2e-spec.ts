import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { SignUpDTO } from '../src/auth/dto/sign-up.dto';
import { SignInDTO } from '../src/auth/dto/sign-in.dto';
import { UserService } from '../src/user/user.service';
import { AccessTokenDTO } from '../src/auth/dto/access-token.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let usersService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    usersService = app.get(UserService);

    await app.init();
  });

  afterEach(async () => {
    await usersService.deleteAll();
  });

  afterAll(async () => {
    await app.close();
  });

  it('sign up with valid input expect user created and status code 201', () => {
    const data: SignUpDTO = {
      email: 'johndoe@email.com',
      password: 'johndoe123',
    };

    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
  });

  it('sign up with existing email expect conflict with status code 409', async () => {
    const data: SignUpDTO = {
      email: 'johndoe@email.com',
      password: 'johndoe123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(data)
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.statusCode).toBe(201);

    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409);
  });

  it('sign in with valid email and password expect access token and status code 200', async () => {
    const data: SignInDTO = {
      email: 'johndoe@email.com',
      password: 'johndoe123',
    };

    const signUpResponse = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(data)
      .set('Accept', 'application/json');

    expect(signUpResponse.headers['content-type']).toMatch(/json/);
    expect(signUpResponse.statusCode).toBe(201);

    const signInResponse = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(data)
      .set('Accept', 'application/json');

    expect(signInResponse.headers['content-type']).toMatch(/json/);
    expect(signInResponse.statusCode).toBe(200);

    const body = signInResponse.body as AccessTokenDTO;
    expect(body.access_token).toBeDefined();
  });
});
