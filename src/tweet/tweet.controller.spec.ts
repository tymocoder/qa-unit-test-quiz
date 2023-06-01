import { TweetController } from './tweet.controller'
import { TweetService } from './tweet.service'

describe("TweetController test suite", () => {
    let tweetController: TweetController;
    let tweetService: TweetService;

    beforeEach(() => {
        tweetService = new TweetService;
        tweetController = new TweetController(tweetService);
    })

    it("getAll", () => {
        const payload = ['one', 'two'];
        jest.spyOn(tweetService, 'getAll').mockImplementation(() => payload)

      expect(tweetController.getAll()).toBe(payload)
    })
})
