import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { SignUpDTO } from './dto/sign-up.dto';
import request from 'supertest';

describe('AuthController', () => {
  let app: INestApplication<App>;
  let controller: AuthController;

  const usersRepositoryMock = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMock
        }
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('sign up with invalid email should 400', async () => {
    const dto: SignUpDTO = {
      email: 'johndoe',
      password: '12345678',
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(dto)
      .expect(400);
  });

  it('sign up with invalid password should 400', async () => {
    const dto: SignUpDTO = {
      email: 'johndoe@email.com',
      password: '1234567',
    };

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(dto)
      .expect(400);
  });

  it('sign up with valid email and password should 201', async () => {
    const dto: SignUpDTO = {
      email: 'johndoe@email.com',
      password: '12345678',
    };

    jest
      .spyOn(usersRepositoryMock, 'findOneBy')
      .mockResolvedValue(null);

    jest
      .spyOn(usersRepositoryMock, 'save')
      .mockResolvedValue({ id: 1, email: dto.email, salt: 'salt', hash: 'hash' });

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(dto)
      .expect(201);
  });
});
