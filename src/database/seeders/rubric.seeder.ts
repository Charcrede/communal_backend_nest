import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rubric } from '../../modules/rubrics/entities/rubric.entity';

@Injectable()
export class RubricSeeder {
  private readonly logger = new Logger(RubricSeeder.name);

  constructor(
    @InjectRepository(Rubric)
    private rubricRepository: Repository<Rubric>,
  ) {}

  async seed(): Promise<Rubric[]> {
    const rubricsData = [
      {
        name: 'La voix du maire',
        slug: 'maire',
        description:
          'Informations officielles et messages adressés à la population par le maire, incluant les projets en cours et les décisions municipales.',
      },
      {
        name: 'La voix du conseil communal',
        slug: 'conseil',
        description:
          'Comptes rendus des réunions du conseil communal, résolutions adoptées et orientations stratégiques pour la commune.',
      },
      {
        name: 'La voix du conseiller local',
        slug: 'conseiller',
        description:
          'Initiatives et actions menées par les conseillers locaux, ainsi que leurs interventions auprès des citoyens.',
      },
      {
        name: 'Publi-reportage',
        slug: 'publi',
        description:
          'Articles promotionnels et reportages sponsorisés mettant en valeur des entreprises, événements ou projets locaux.',
      },
    ];

    const existing = await this.rubricRepository.find();
    if (existing.length > 0) {
      this.logger.log('Rubriques déjà présentes ✅');
      return existing;
    }

    const rubrics = this.rubricRepository.create(rubricsData);
    await this.rubricRepository.save(rubrics);

    this.logger.log(`${rubrics.length} rubriques insérées ✅`);
    return rubrics;
  }
}
