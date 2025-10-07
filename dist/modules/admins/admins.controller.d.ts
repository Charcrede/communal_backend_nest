import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminsController {
    private readonly adminsService;
    constructor(adminsService: AdminsService);
    create(createAdminDto: CreateAdminDto): Promise<import("./entities/admin.entity").Admin>;
    findAll(): Promise<import("./entities/admin.entity").Admin[]>;
    findOne(id: string, req: any): Promise<import("./entities/admin.entity").Admin>;
    update(id: string, updateAdminDto: UpdateAdminDto, req: any): Promise<import("./entities/admin.entity").Admin>;
    remove(id: string): Promise<void>;
}
