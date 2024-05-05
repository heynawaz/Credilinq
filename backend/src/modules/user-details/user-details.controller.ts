import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UserDetailsDto } from './dto/userDetails.dto';
import { UserDetailsService } from './user-details.service';

@Controller('user-details')
export class UserDetailsController {
    constructor(private readonly userDetailsService: UserDetailsService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async create(@Body() userDetails: UserDetailsDto) {
        return await this.userDetailsService.create(userDetails);
    }

    @Get()
    async get() {
        return this.userDetailsService.get();
    }
}
