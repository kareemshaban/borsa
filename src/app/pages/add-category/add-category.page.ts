import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Category, CatgeoryService } from 'src/app/services/catgeory.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {

  loaded: boolean = true;
  cat: Category ={
    name: '' , 
    code: '' , 
    img: ''
  }
  name: string ;
  code: string ;
  constructor(private categoryService: CatgeoryService , private toastControl: ToastController , 
    private router: Router) { }

  ngOnInit() {
  }
  AddNew(){
    this.loaded = false ;
    this.cat = {
      name: this.name , 
      code: this.code ,
      img: ''
    }
    this.categoryService.CreatUserDocument(this.cat).then(res =>{
      this.loaded = true ;
      this.presentToast('Done!' , 'success' , 3000);
      this.router.navigateByUrl('categories');
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
}
