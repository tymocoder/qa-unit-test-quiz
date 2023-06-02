import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TweetService } from './tweet.service';

describe('TweetService test suite', () => {
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

  describe('getAll', () => {
    it('should return all tweets', () => {
      const payload = ['one', 'two'];
      service.tweets = payload;

      const tweets = service.getAll();
      expect(tweets).toBe(payload);
    });
  });

  describe('get', () => {
    it('should return tweet', () => {
      const payload = 'test value';
      service.tweets = [payload];

      expect(service.get(0)).toBe(payload);
    });

    it('should return NotFoundException if element not exist', () => {
      const errorMessage = 'That tweet does not exist';
      const tweet = () => {
        return service.get(0);
      };

      expect(tweet).toThrowError(NotFoundException);
      expect(tweet).toThrowError(errorMessage);
    });
  });

  describe('update', () => {
    it('should return updated tweet', () => {
      const payload = ['one', 'two'];
      service.tweets = payload;
      const id = 0;
      const tweet = "updated tweet"

      expect(service.update(tweet, id)).toBe(tweet)
      expect(service.tweets[id]).toBe(tweet)
    });

    it('should return NotFoundException', () => {
      const payload = ['one', 'two'];
      service.tweets = payload;
      const id = 2;
      const tweet = "updated tweet"
      const errorMessage = "That tweet does not exist";

      expect(() => service.update(tweet, id)).toThrowError(NotFoundException);
      expect(() => service.update(tweet, id)).toThrowError(errorMessage);
    });
  });

  describe('delete', () => {
    it('should return deleted tweet', () => {
      const payload = ['one', 'two'];
      service.tweets = payload;
      const id = 0;

      expect(payload[id]).toEqual(service.delete(id));
    });
  });
});
