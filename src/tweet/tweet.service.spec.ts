import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TweetService } from './tweet.service';

describe('TweetService', () => {
  let service: TweetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetService],
    }).compile();

    service = module.get<TweetService>(TweetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create tweet', () => {
      service.tweets = [];
      const payload = 'This is my tweet';

      const tweet = service.create(payload);

      expect(tweet).toBe(payload);
      expect(service.tweets).toHaveLength(1);
      expect(service.tweets[0]).toBe(payload);
    });

    it('should prevent empty tweets', () => {
      const payload = '';
      const errorMessage = 'Tweet cannot be empty.';

      const createTweet = () => {
        return service.create(payload);
      };

      expect(createTweet).toThrowError(BadRequestException);
      expect(createTweet).toThrowError(errorMessage);
    });

    it('should prevent tweets over 100 character', () => {
      const payload =
        'This is a long tweet over 100 characters This is a long tweet over 100 characters This is a long t...';
      const errorMessage = 'Tweet too long.';

      const createTweet = () => {
        return service.create(payload);
      };

      expect(createTweet).toThrowError(BadRequestException);
      expect(createTweet).toThrowError(errorMessage);
    });
  });

  describe('My interview test suite', () => {
    it('should return tweet', () => {
      service.tweets = [];
      const payload = 'test value';
      const tweet = service.create(payload);

      expect(service.get(0)).toBe(payload);
    });

    it('should return NotFoundException if element not exist', () => {
      const tweet = () => {
        return service.get(0);
      };

      expect(tweet).toThrowError();
    });
  });
});
