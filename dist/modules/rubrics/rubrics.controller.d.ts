import { RubricsService } from './rubrics.service';
import { CreateRubricDto } from './dto/create-rubric.dto';
import { UpdateRubricDto } from './dto/update-rubric.dto';
export declare class RubricsController {
    private readonly rubricsService;
    constructor(rubricsService: RubricsService);
    create(createRubricDto: CreateRubricDto): Promise<import("./entities/rubric.entity").Rubric>;
    findAll(): Promise<import("./entities/rubric.entity").Rubric[]>;
    findOne(id: string): Promise<import("./entities/rubric.entity").Rubric>;
    update(id: string, updateRubricDto: UpdateRubricDto): Promise<import("./entities/rubric.entity").Rubric>;
    remove(id: string): Promise<void>;
}
