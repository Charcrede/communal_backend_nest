import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminsService {
    private adminsRepository;
    constructor(adminsRepository: Repository<Admin>);
    create(createAdminDto: CreateAdminDto): Promise<Admin>;
    findAll(): Promise<Admin[]>;
    findOne(id: string): Promise<Admin>;
    findByEmail(email: string): Promise<Admin | null>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin>;
    remove(id: string): Promise<void>;
}
