import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'analysis',
    loadChildren: () => import('./pages/analysis/analysis.module').then( m => m.AnalysisPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'recommendation',
    loadChildren: () => import('./pages/recommendation/recommendation.module').then( m => m.RecommendationPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'add-analysis',
    loadChildren: () => import('./pages/add-analysis/add-analysis.module').then( m => m.AddAnalysisPageModule)
  },
  {
    path: 'add-news',
    loadChildren: () => import('./pages/add-news/add-news.module').then( m => m.AddNewsPageModule)
  },
  {
    path: 'add-recommendation',
    loadChildren: () => import('./pages/add-recommendation/add-recommendation.module').then( m => m.AddRecommendationPageModule)
  },
  {
    path: 'add-category',
    loadChildren: () => import('./pages/add-category/add-category.module').then( m => m.AddCategoryPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'edit-category',
    loadChildren: () => import('./pages/edit-category/edit-category.module').then( m => m.EditCategoryPageModule)
  },
  {
    path: 'edit-news',
    loadChildren: () => import('./pages/edit-news/edit-news.module').then( m => m.EditNewsPageModule)
  },
  {
    path: 'edit-recommendation',
    loadChildren: () => import('./pages/edit-recommendation/edit-recommendation.module').then( m => m.EditRecommendationPageModule)
  },
  {
    path: 'edit-analysis',
    loadChildren: () => import('./pages/edit-analysis/edit-analysis.module').then( m => m.EditAnalysisPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./pages/order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'favourit',
    loadChildren: () => import('./pages/favourit/favourit.module').then( m => m.FavouritPageModule)
  },
  {
    path: 'favourit-home',
    loadChildren: () => import('./pages/favourit-home/favourit-home.module').then( m => m.FavouritHomePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
