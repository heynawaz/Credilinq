import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDetailsDto } from './dto/userDetails.dto';

@Injectable()
export class UserDetailsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(userDetails: UserDetailsDto) {
        try {
            return await this.prisma.userDetails.create({ data: { ...userDetails, termsCheck: Boolean(userDetails?.termsCheck) } });
        } catch (error) {
            throw new Error(error);
        }
    }

    async get() {
        try {
            return await this.prisma.userDetails.findMany({
                select: { companyName: true, email: true, companyUEN: true, fullName: true, position: true },
                orderBy: { createdAt: 'desc' }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
