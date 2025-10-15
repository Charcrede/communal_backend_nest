import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Type, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function ConditionalFileInterceptor(fieldName: string): Type<NestInterceptor> {
  @Injectable()
  class MixinInterceptor implements NestInterceptor {
    private fileInterceptor = FileInterceptor(fieldName, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 25 * 1024 * 1024 },
    });

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const req = context.switchToHttp().getRequest();

      // Si le header indique multipart/form-data → on utilise FileInterceptor
      if (req.headers['content-type']?.includes('multipart/form-data')) {
        const realInterceptor = new (this.fileInterceptor as any)();
        return realInterceptor.intercept(context, next);
      }

      // Sinon → on ne fait rien
      return next.handle();
    }
  }

  return MixinInterceptor;
}
