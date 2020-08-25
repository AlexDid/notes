import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { RouterStoreModule } from './modules/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

const MODULES = [
  AngularFireAuthModule,
  AngularFirestoreModule,
  RouterModule,
  RouterStoreModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ...MODULES
  ],
  exports: [
    AngularFireModule,
    ...MODULES
  ]
})
export class CoreModule { }
