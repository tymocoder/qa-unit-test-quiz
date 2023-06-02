import { Test, TestingModule } from '@nestjs/testing';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';

describe('TweetController test suite', () => {
  let tweetController: TweetController;
  let tweetService: TweetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [TweetController],
        providers: [TweetService],
    }).compile();

    tweetController = module.get<TweetController>(TweetController);
    tweetService = module.get<TweetService>(TweetService);
  });

  describe('getAll', () => {
    it('should return all tweets', () => {
      const tweets = ['one', 'two'];
      jest.spyOn(tweetService, 'getAll').mockReturnValue(tweets);

      expect(tweetController.getAll()).toBe(tweets);
    });
  });

  describe('get', () => {
    it('should return tweet with certain id', () => {
      const id = 1;
      const tweet = 'first tweet';
      jest.spyOn(tweetService, 'get').mockReturnValue(tweet);

      expect(tweetController.get(id)).toBe(tweet);
      expect(tweetService.get).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should create new tweet', () => {
      const tweet = 'new tweet';
      jest.spyOn(tweetService, 'create').mockReturnValue(tweet);

      expect(tweetController.create({tweet})).toEqual(tweet);
      expect(tweetService.create).toHaveBeenCalledWith(tweet);
    });
  });

  describe('update', () => {
    it('should update tweet with certain id', () => {
        const id = 1;
        const tweet = 'updated tweet';
      jest.spyOn(tweetService, 'update').mockReturnValue(tweet);

      expect(tweetController.update(id, {tweet})).toEqual(tweet);
      expect(tweetService.update).toHaveBeenCalledWith(tweet, id);
    });
  });

  describe('delete', () => {
  });
});
