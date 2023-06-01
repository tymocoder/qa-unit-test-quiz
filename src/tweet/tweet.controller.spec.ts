import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';

describe('TweetController test suite', () => {
  let tweetController: TweetController;
  let tweetService: TweetService;

  beforeEach(() => {
    tweetService = new TweetService();
    tweetController = new TweetController(tweetService);
  });

  describe('getAll', () => {
    it('should return all tweets', () => {
      const payload = ['one', 'two'];
      jest.spyOn(tweetService, 'getAll').mockImplementation(() => payload);

      expect(tweetController.getAll()).toBe(payload);
    });
  });

  describe('get', () => {
    it('should return tweet with certain id', () => {
      const id = 1;
      const tweet = 'first tweet';
      jest.spyOn(tweetService, 'get').mockImplementation(() => tweet);

      expect(tweetController.get(id)).toBe(tweet);
    });
  });
});
