import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth
  ) { }

  async login(email: string, password: string): Promise<User> {
    await this.fireAuth.signInWithEmailAndPassword(email, password);
    return this.getSerializedUser();
  }

  async signUp(email: string, password: string): Promise<User> {
    await this.fireAuth.createUserWithEmailAndPassword(email, password);
    return this.getSerializedUser();
  }

  async loginGoogle(): Promise<User> {
    await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.getSerializedUser();
  }

  async logout(): Promise<void> {
    return this.fireAuth.signOut();
  }


  private async getSerializedUser(): Promise<User> {
    const user = await this.fireAuth.currentUser;

    return {
      id: user.uid,
      name: user.displayName || user.email,
      picture: user.photoURL
    };
  }


}
