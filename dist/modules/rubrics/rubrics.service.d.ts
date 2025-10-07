import { Repository } from 'typeorm';
import { Rubric } from './entities/rubric.entity';
import { CreateRubricDto } from './dto/create-rubric.dto';
import { UpdateRubricDto } from './dto/update-rubric.dto';
export declare class RubricsService {
    private rubricsRepository;
    private readonly logger;
    constructor(rubricsRepository: Repository<Rubric>);
    create(createRubricDto: CreateRubricDto): Promise<Rubric>;
    findAll(): Promise<Rubric[]>;
    findOne(id: string): Promise<Rubric>;
    update(id: string, updateRubricDto: UpdateRubricDto): Promise<Rubric>;
    remove(id: string): Promise<void>;
}
