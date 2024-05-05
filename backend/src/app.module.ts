import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserDetailsModule } from './modules/user-details/user-details.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
    imports: [UserDetailsModule],
    controllers: [AppController],
    providers: [PrismaService, AppService]
})
export class AppModule {}
