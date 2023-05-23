import { Test, TestingModule } from '@nestjs/testing'
import { TweetService } from './tweet.service'

describe('TweetService', () => {
  let service: TweetService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ TweetService ]
    }).compile()

    service = module.get<TweetService>(TweetService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createTweet', () => {
    it('should create tweet', () => {
      service.tweets = []
      const payload = 'This is my tweet'

      const tweet = service.create(payload)

      expect(tweet).toBe(payload)
      expect(service.tweets).toHaveLength(1)
    })

    it('should prevent empty tweets', () => {
      const payload = ''

      const tweet = () => {
        return service.create(payload)
      }

      expect(tweet).toThrowError()
    })

    it('should prevent tweets over 100 character', () => {
      const payload =
        'This is a long tweet over 100 characters This is a long tweet over 100 characters This is a long t...'

      const tweet = () => {
        return service.create(payload)
      }

      expect(tweet).toThrowError()
    })
  })

})
