import { Repository } from 'typeorm';
import { Rubric } from '../../modules/rubrics/entities/rubric.entity';
export declare class RubricSeeder {
    private rubricRepository;
    private readonly logger;
    constructor(rubricRepository: Repository<Rubric>);
    seed(): Promise<Rubric[]>;
}
