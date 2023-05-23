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
  create(@Body() body: any): string {
    return this.tweetService.create(body)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body): string {
    return this.tweetService.update(body, Number(id))
  }

  @Delete(':id')
  delete(@Param('id') id: number): string {
    return this.tweetService.delete(Number(id))
  }
}
