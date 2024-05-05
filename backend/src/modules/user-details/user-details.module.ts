import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { UserDetailsController } from './user-details.controller';
import { UserDetailsService } from './user-details.service';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: join('./uploads'),
                filename: (req, file, cb) => {
                    const uniqueSuffix = uuid();
                    cb(null, `${uniqueSuffix}-${file.originalname}`);
                }
            })
        }),
        ConfigModule.forRoot()
    ],
    controllers: [UserDetailsController],
    providers: [UserDetailsService, PrismaService]
})
export class UserDetailsModule {}
