import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/Models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/Auth.service';
import { UserService } from 'src/app/services/User.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  baseUrl = environment.apiUrl;
  response: string;
  currentMainPhoto: Photo;

  constructor( private authservice: AuthService, private userService: UserService, private alertify: AlertifyService) {
   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authservice.decodedToken.nameid + '/photos',
      authToken : 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
      // disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      // formatDataFunctionIsAsync: true,
      // formatDataFunction: async (item) => {
      //   return new Promise( (resolve, reject) => {
      //     resolve({
      //       name: item._file.name,
      //       length: item._file.size,
      //       contentType: item._file.type,
      //       date: new Date()
      //     });
      //   });
      // }

    });

    this.uploader.onSuccessItem = (item, response, status, Headers) => {
      if ( response ){
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          isMain: res.isMain,
          description: res.description
        };
        this.photos.push(photo);
      }
      console.log(this.photos);
    };

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = '';

    this.uploader.response.subscribe( res => this.response = res );
    console.log(this.response);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  setMainPhoto(photo: Photo){
    console.log(this.photos);
    this.userService.setMainPhoto(this.authservice.decodedToken.nameid, photo.id).subscribe( () =>{
      console.log('successfully set to main');
      this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
      this.currentMainPhoto.isMain = false;
      photo.isMain = true;
      // this.getMemberPhotoChange.emit(photo.url);
      this.authservice.changeMemberPhoto(photo.url);
      this.authservice.currentUser.url = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authservice.currentUser));
    }, error => {
      this.alertify.error('error');
    });
  }

  deletePhoto(id: number){
    console.log(id);
    console.log(this.photos);
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authservice.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        // this. photos = this.photos.filter(photo => photo.id !== id);
        console.log(this.photos);
        this.alertify.success('photo deleted');
      }, error => {
        this.alertify.error('Failed to delete photo');
      });
    });

  }

}
