import {inject, Injectable} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {Observable, Observer} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileHelperUtil {
  fileList: NzUploadFile[] = [];

  constructor(private messageService: NzMessageService) {}

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      this.fileList = this.fileList.concat(file);
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isJpgOrPng) {
        this.messageService.error('You can only upload JPG/PNG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.messageService.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
}
