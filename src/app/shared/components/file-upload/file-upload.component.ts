import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { HttpClientService } from '../../../services/http-client.service';
import { firstValueFrom } from 'rxjs';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatButton, LoaderComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  fileName: string;
  uploading = false;
  @Input() uploadedImage: string;
  @Output() doneUploading = new EventEmitter();
  constructor(private http: HttpClientService) {}

  async onFileChange(event) {
    this.uploading = true;
    try {
      console.log('onFileChange', event);
      const file: File = event.target.files[0];
      this.fileName = file.name;
      console.log('file', file);
      const formData = new FormData();
      formData.append('file', file);
      const uploadedFile: any = await firstValueFrom(
        this.http.post('upload', formData)
      );
      console.log('uploadedFile', uploadedFile);
      this.uploadedImage = await firstValueFrom(
        this.http.getImageUrl(uploadedFile?.path)
      );
      this.doneUploading.emit(uploadedFile?.path);
    } catch (e) {
      this.doneUploading.emit();
      console.error('Failed to upload file', e);
    }
    this.uploading = false;
  }
}
