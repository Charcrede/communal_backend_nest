import { Injectable } from '@nestjs/common';
import { MediaService } from '@/modules/media/media.service';
import { MediaType } from '@/modules/media/entities/media.entity';

@Injectable()
export class MediaSeeder {
  constructor(private readonly mediaService: MediaService) {}

  async seed(userId:string) {
    const user_id = userId; // adapte avec un ID valide
    const videos = [
      { url: 'https://youtu.be/0aSG0l8oIHM', title: 'Vidéo 1' },
      { url: 'https://youtu.be/3xQ80DOkN1A', title: 'Vidéo 2' },
      { url: 'https://youtu.be/ZtXWvvsy7VQ', title: 'Vidéo 3' },
      { url: 'https://youtu.be/fiqxEb_URX0', title: 'Vidéo 4' },
      { url: 'https://youtu.be/Ulu4WnE8CYw', title: 'Vidéo 5' },
    ];

    for (const video of videos) {
      await this.mediaService.create({
        title: video.title,
        description: `Vidéo YouTube : ${video.url}`,
        type: MediaType.VIDEO,
        article_id: null,
        url: video.url,
        youtubeUrl: video.url,
        filename: `youtube-${Date.now()}-${Math.floor(Math.random() * 1e6)}.txt`,
        size: 0,
      }, user_id);
    }

    console.log('Seeder medias terminé ✅');
  }
}
