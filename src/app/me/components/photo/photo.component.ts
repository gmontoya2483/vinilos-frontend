import { Component, OnInit } from '@angular/core';
import {MeService} from '../../services/me/me.service';
import {FileUploadService} from '../../../services/file-upload/file-upload.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styles: [
  ]
})
export class PhotoComponent implements OnInit {

  public changeImage = false;
  public imagenSubir: File;
  public imgTemp: string | ArrayBuffer = null;
  public saving = false;



  constructor(public meService: MeService,
  ) { }

  ngOnInit(): void {
  }

  cambiarImagen(file: File) {

    // console.log(file);
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }


    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {

      this.imgTemp = reader.result;

    };


  }

  subirImagen() {
    this.saving = true;
    this.meService.ChangeMyImage(this.imagenSubir);
    this.imagenSubir = null;
    this.imgTemp = null;
    this.changeImage = false;
    this.saving = false;
  }

  EnableChangeImage() {
    this.changeImage = true;
  }

  cancelUploadImg() {
    this.changeImage = false;
    this.imagenSubir = null;
    this.imgTemp = null;
  }
}
