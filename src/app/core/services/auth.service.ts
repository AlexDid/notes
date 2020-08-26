import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { User } from '../models';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { USERS_COLLECTION } from '../data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  async login(email: string, password: string): Promise<User> {
    await this.fireAuth.signInWithEmailAndPassword(email, password);
    return this.getSerializedUser();
  }

  async signUp(email: string, password: string): Promise<User> {
    await this.fireAuth.createUserWithEmailAndPassword(email, password);
    const user = await this.getSerializedUser();
    await this.addUserToDb(user);
    return user;
  }

  async loginGoogle(): Promise<User> {
    await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = await this.getSerializedUser();
    await this.addUserToDb(user);
    return user;
  }

  async logout(): Promise<void> {
    return this.fireAuth.signOut();
  }

  async getSerializedUser(): Promise<User> {
    const user = await this.fireAuth.currentUser;

    return {
      id: user.uid,
      name: user.displayName || user.email,
      picture: user.photoURL
    };
  }

  private async addUserToDb(user: User): Promise<DocumentReference | void> {
    const userRef = this.firestore.collection(USERS_COLLECTION).doc(user.id);
    const snapshot = await userRef.get().toPromise();
    if (!snapshot.exists) {
      return userRef.set(user);
    }
  }

}
