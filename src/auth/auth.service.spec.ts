import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;

  const jwtServiceMock = {
    signAsync: jest.fn(),
  };

  const usersRepositoryMock = {
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('sign up with available email expect to be defined', async () => {
    const email = 'johndoe@email.com';
    const password = 'johndoe123';

    usersRepositoryMock.findOneBy.mockResolvedValue(null);
    usersRepositoryMock.save.mockResolvedValue({
      id: 1,
      email,
      salt: 'salt',
      hash: 'hash',
    });

    const user = await authService.signUp(email, password);
    expect(user).toBeDefined();
  });

  it('sign up with unavailable email expect exception', async () => {
    const email = 'johndoe@email.com';
    const password = 'johndoe123';

    usersRepositoryMock.findOneBy.mockResolvedValue({
      id: 1,
      email,
      salt: 'salt',
      hash: 'hash',
    });

    await expect(authService.signUp(email, password)).rejects.toThrow(
      ConflictException,
    );
  });

  it('sign in with non existing account expect exception', async () => {
    const email = 'johndoe@email.com';
    const password = 'johndoe123';

    usersRepositoryMock.findOneBy.mockResolvedValue(null);

    await expect(authService.signIn(email, password)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('sign in with non matching password expect exception', async () => {
    const email = 'johndoe@email.com';
    const password = 'johndoe123';

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    usersRepositoryMock.findOneBy.mockResolvedValue({
      id: 1,
      email,
      salt,
      hash,
    });

    await expect(authService.signIn(email, `${password}!`)).rejects.toThrow(
      UnauthorizedException,
    );

    expect(jwtServiceMock.signAsync).not.toHaveBeenCalled();
  });

  it('sign in with matching password expect access token', async () => {
    const email = 'johndoe@email.com';
    const password = 'johndoe123';

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    usersRepositoryMock.findOneBy.mockResolvedValue({
      id: 1,
      email,
      salt,
      hash,
    });

    jwtServiceMock.signAsync.mockResolvedValue('access_token');

    const { access_token } = await authService.signIn(email, password);
    expect(access_token).toBe('access_token');

    expect(jwtServiceMock.signAsync).toHaveBeenCalled();
  });
});
