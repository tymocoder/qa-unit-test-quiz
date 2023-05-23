import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { TweetService } from './tweet.service'

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {
  }

  @Get()
  getAll(): string[] {
    return this.tweetService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: any): string {
    return this.tweetService.get(id)
  }

  @Post()
  create(@Body() body: { tweet: string }): string {
    return this.tweetService.create(body.tweet)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: { tweet: string }): string {
    return this.tweetService.update(body.tweet, Number(id))
  }

  @Delete(':id')
  delete(@Param('id') id: number): string {
    return this.tweetService.delete(Number(id))
  }
}
