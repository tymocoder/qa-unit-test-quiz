import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class TweetService {
  tweets: string[] = []

  create(tweet: string): string {
    if (!tweet.length) {
      throw new BadRequestException('Tweet cannot be empty.')
    }
    if (tweet.length > 100) {
      throw new BadRequestException('Tweet too long.')
    }
    this.tweets.push(tweet)
    return tweet
  }

  update(tweet: string, id: number): string {
    const tweetToUpdate = this.tweets[ id ]
    if (!tweetToUpdate) {
      throw new NotFoundException('That tweet does not exist')
    }
    if (!tweet.length) {
      throw new BadRequestException('Tweet cannot be empty.')
    }
    if (tweet.length > 100) {
      throw new BadRequestException('Tweet too long.')
    }
    this.tweets[ id ] = tweet

    return tweet
  }

  getAll(): string[] {
    return this.tweets
  }

  get(id: number): string {
    const tweet = this.tweets[ id ]

    if (!tweet) {
      throw new NotFoundException('That tweet does not exist')
    }

    return tweet
  }

  delete(id: number): string {
    const tweet = this.tweets[ id ]
    if (!tweet) {
      throw new NotFoundException('That tweet does not exist')
    }
    this.tweets.splice(id, 1)

    return tweet
  }
}
