import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { ActionSheetController, Platform, ToastController } from '@ionic/angular';
import { Analysis, AnalysisService } from 'src/app/services/analysis.service';
import { Category, CatgeoryService } from 'src/app/services/catgeory.service';
import { NewsService } from 'src/app/services/news.service';
import { File , FileEntry  } from '@ionic-native/File/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
const MEDIA_FOLDER_NAME = 'my_media';
import {FilePath} from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { finalize } from 'rxjs/operators';
import{Notification, NotificationService} from 'src/app/services/notification.service'
import { EmailComposer } from '@ionic-native/email-composer/ngx';
@Component({
  selector: 'app-add-analysis',
  templateUrl: './add-analysis.page.html',
  styleUrls: ['./add-analysis.page.scss'],
})
export class AddAnalysisPage implements OnInit {
  categories: Category[];
  loaded: boolean = true;
  news: Analysis ={
    title: '' , 
    details: '' , 
    cat: null , 
    date: new Date() ,
    img: '' ,
    watch: 0
  }
  value: any ;
  cat: number ;
  title: string ;
  details: string ;
  files = [];
  fileObj: any = null;
  name: string = '';
  profile: string ;
  uploadProgress = 0;
  downloadURL: string ;
  fillteredCats: Category [];
  search: string = '';
  constructor(private categoryService: CatgeoryService , private newsService: AnalysisService , 
    private toastControl: ToastController , private router: Router , 
    private imagePicker: ImagePicker,
    private mediaCapture: MediaCapture,
    private file: File, private emailComposer: EmailComposer ,
    private media: Media,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private  webView: WebView ,
    private actionSheetController: ActionSheetController,
    private plt: Platform,  private camera: Camera ,private filePath: FilePath ,
    private notificationService: NotificationService ,
    private storage: AngularFireStorage) {
      this.profile = '../../../assets/images/logo.png';
    this.categoryService.GetCategories().subscribe(res =>{
      this.categories = res ;
      this.fillteredCats = res ;
    });
   }
   AddNew(img: string){
    this.loaded = false ;
    this.news ={
      title: this.title , 
      details:this.details ,
      cat: this.fillteredCats[this.cat] ,
      date: new Date() ,
      img: img , 
      watch: 0
    }
    this.newsService.CreatDocument(this.news).then(res =>{
   
      this.CreatNotification();
    }).catch(err =>{
     this.loaded = true ;
     this.presentToast('something went wrong' , 'danger' , 3000);
    });
  }
  CreatNotification(){
    const notification :Notification = {
       title: this.fillteredCats[this.cat].code + " " + this.fillteredCats[this.cat].name, 
       details: this.title ,
       date: new Date() ,   
       users: []
    }
    this.notificationService.CreatDocument(notification).then(res =>{
      this.loaded = true ;
      this.presentToast('Done!' , 'success' , 3000);
      this.router.navigateByUrl('analysis');
    }).catch(err =>{
      this.loaded = true ;
      this.presentToast('something went wrong' , 'danger' , 3000);
    });

  }
  async presentToast( Mmessage: string , mColor: string , mduration: number) {
   const toast = await this.toastControl.create({
     message: Mmessage,
     position: 'bottom',
     color: mColor  ,
     duration: mduration
   });
   toast.present();
 }
  ngOnInit() {
    // this.plt.ready().then(() => {
    //   let path = this.file.dataDirectory;
    //   this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
    //     () => {
    //       this.loadFiles();
    //     },
    //     err => {
    //       this.file.createDir(path, MEDIA_FOLDER_NAME, false);
    //     }
    //   );
    // });
  }
  loadFiles() {
    this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(
      res => {
        this.files = res;
        if(this.files.length > 0)
        this.fileObj = this.files[0];
      },
      err => console.log('error loading files: ', err)
    );
  }
 createFileName() {
    const d = new Date();
    const  name = String(d.getFullYear()) + String(d.getMonth()) + String(d.getDay()) +
        String(d.getHours()) + String(d.getMinutes())+ String(d.getSeconds()) + String(d.getMilliseconds()) ;
    return name;
  }
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.name = String(this.createFileName()) ;

    this.camera.getPicture(options).then(imagePath => {
      if (this.plt.is('android')) {
        this.filePath.resolveNativePath(imagePath)
            .then(filePath => {
              const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              const currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              this.name = this.name + String(currentName.substring(currentName.lastIndexOf('.'))) ;
              this.copyFileToLocalDir(correctPath, currentName, this.name);
            });
      } else {
        const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.name = this.name + String(currentName.substring(currentName.lastIndexOf('.'))) ;
        this.copyFileToLocalDir(correctPath, currentName, this.name );
      }
    });
  
}
copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
    // this.updateStoredImages(newFileName);
    this.profile = this.pathForImage(this.file.dataDirectory + this.name);
  }, error => {
    this.presentToast('Error while storing file.' , 'danger' , 3000);
  });
}
  pickImages() {
    // this.imagePicker.getPictures({}).then(
    //   results => {
    //     for (var i = 0; i < results.length; i++) {
    //       this.copyFileToLocalDir(results[i]);
    //     }
    //   }
    // );

    // If you get problems on Android, try to ask for Permission first
    // this.imagePicker.requestReadPermission().then(result => {
    //   console.log('requestReadPermission: ', result);
    //   this.selectMultiple();
    // });
  }
  // copyFileToLocalDir(fullPath) {
  //   let myPath = fullPath;
  //   // Make sure we copy from the right location
  //   if (fullPath.indexOf('file://') < 0) {
  //     myPath = 'file://' + fullPath;
  //   }
 
  //   const ext = myPath.split('.').pop();
  //   const d = Date.now();
  //   const newName = `${d}.${ext}`;
 
  //   const name = myPath.substr(myPath.lastIndexOf('/') + 1);
  //   const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
  //   const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;
 
  //   this.file.copyFile(copyFrom, name, copyTo, newName).then(
  //     success => {
  //       this.loadFiles();
  //       // this.name = this.pathForImage(copyTo + newName);
  //       // alert(this.name);

  //     },
  //     error => {
  //       alert('error:' +  error);
  //     }
  //   );
  // }
  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      const converted = this.webView.convertFileSrc(img);
      return converted;
    }
  }
  openFile(f: FileEntry) {
      this.photoViewer.show(f.nativeURL, 'MY awesome image');
  }
 
  deleteFile(f: FileEntry) {
    const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
    this.file.removeFile(path, f.name).then(() => {
      this.loadFiles();
    }, err => console.log('error remove: ', err));
  } 
  StartUploadImage(){

    this.loaded  = false ;
    if(this.name != ''){
      this.file.resolveLocalFilesystemUrl(this.file.dataDirectory + this.name)
      .then(entry => {
       this.UploadImage (  entry as FileEntry );
      })
      .catch(err => {
        this.presentToast('Error while reading file.', 'danger', 3000);
      });
    } else {
      this.AddNew('');
    }
 
}
SenEmail(){
  let email = {
    to: 'shabankareem577@gmail.com',
    cc: [],
    bcc: [],
    attachments: [],
    subject: 'BorsaDaily',
    body: 'How are you? Nice greetings from Leipzig',
    isHtml: false ,
    app: "Gmail" 
    
  }
  
  // Send a text message using default options
  this.emailComposer.open(email);
}
async UploadImage(f: FileEntry){
  const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
  const type = this.getMimeType(f.name.split('.').pop());
  const buffer = await this.file.readAsArrayBuffer(path, f.name);
  const fileBlob = new Blob([buffer], type);

  const randomId = Math.random()
      .toString(36)
      .substring(2, 8);

      const dateStamp = new Date().getTime() ;
      
      const uploadTask = this.storage.upload(
        `files/${dateStamp}_${randomId}`,
        fileBlob
      );
   
      uploadTask.percentageChanges().subscribe(change => {
        this.uploadProgress = change;
      });
   
      uploadTask.then(async res => {
         this.presentToast('Image Has been Uploaded' , 'success' , 3000);
         uploadTask.snapshotChanges().pipe(
          finalize(() => {
            this.storage.ref(`files/${dateStamp}_${randomId}`).getDownloadURL().subscribe(res =>{ 
              this.downloadURL =res  ;
              this.AddNew(this.downloadURL);
           } , err =>{
            this.AddNew('');
           }); // <-- Here the downloadURL is available.
         
          
        
        })
        ).subscribe();
        
      } , err =>{
        this.AddNew('');
      });
}
getMimeType(fileExt) {
  if (fileExt == 'wav') return { type: 'audio/wav' };
  else if (fileExt == 'jpg') return { type: 'image/jpg' };
  else if (fileExt == 'png') return { type: 'image/png' };
  else if (fileExt == 'jpeg') return { type: 'image/jpeg' };
}
onChange($event: Event): void {
  this.value = ($event as CustomEvent).detail.value;
  this.fillteredCats = [] ;
  for(let i = 0 ; i < this.categories.length ; i++){
    if((this.categories[i].name + this.categories[i].code ).toLowerCase().includes(String(this.value).toLowerCase())){
      this.fillteredCats.push(this.categories[i]);
    }
  }
}
}
