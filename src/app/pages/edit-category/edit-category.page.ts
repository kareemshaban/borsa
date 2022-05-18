import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Category, CatgeoryService } from 'src/app/services/catgeory.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.page.html',
  styleUrls: ['./edit-category.page.scss'],
})
export class EditCategoryPage implements OnInit {
  cat: Category ={
    name: '' , 
    code: '' , 
    img: ''
  }
  name: string ;
  code: string ;
  loaded: boolean = true; 
  constructor(private categoryService: CatgeoryService , private toastControl: ToastController , 
    private router: Router) { 
      this.cat = this.categoryService.getCat();
      this.name = this.cat.name ;
      this.code = this.cat.code ;
    }

  ngOnInit() {
  }
  AddNew(){
    this.loaded = false ;
    this.cat.name = this.name ;
    this.cat.code = this.code ;
    this.categoryService.updateCategory(this.cat).then(res =>{
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
