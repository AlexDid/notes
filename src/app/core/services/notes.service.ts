import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { AngularFirestoreDocument } from '@angular/fire/firestore/document/document';
import { Note, NoteForm } from '../../notes/models';
import { NOTES_COLLECTION, USERS_COLLECTION } from '../data';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private readonly IMAGES_STORAGE_PATH = 'notes';

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  getNotes(userId: string): Promise<Note[]> {
    return this.getNotesCollection(userId)
      .get()
      .toPromise()
      .then(query => query.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }) as Note));
  }

  async createNote({content, imageBase64, timestamp}: NoteForm, userId: string): Promise<Note> {
    const note: Note = {
      content,
      timestamp,
      imageURL: null,
      imagePath: null
    };

    if (imageBase64) {
      const { url, path } = await this.uploadImage(imageBase64, userId);
      note.imagePath = path;
      note.imageURL = url;
    }

    const ref = await this.getNotesCollection(userId).add(note);
    const doc = await ref.get() as DocumentSnapshot<Note>;
    return {
      ...doc.data(),
      id: doc.id,
    };
  }

  async updateNote({content, imageBase64, timestamp}: NoteForm, note: Note, userId: string): Promise<Note> {
    const updateData: Partial<Note> = {
      content,
      timestamp
    };

    if (imageBase64) {
      await this.deleteImage(note.imagePath);
      const { url, path } = await this.uploadImage(imageBase64, userId);
      updateData.imagePath = path;
      updateData.imageURL = url;
    }

    const noteRef = this.getNotesCollection(userId).doc(note.id) as AngularFirestoreDocument<Note>;
    await noteRef.update(updateData);
    const doc = await noteRef.ref.get();
    return {
      ...doc.data(),
      id: doc.id
    } as Note;
  }

  async deleteNote({ id, imagePath }: Note, userId: string): Promise<void> {
    if (imagePath) {
      await this.deleteImage(imagePath);
    }
    return this.getNotesCollection(userId).doc(id).delete();
  }

  private async uploadImage(base64: string, userId: string): Promise<{url: string, path: string}> {
    const path = `${this.IMAGES_STORAGE_PATH}/${new Date().getTime()}_${userId}`;
    const blob = await fetch(base64).then(res => res.blob());
    const response = await this.storage.upload(path, blob, {
      cacheControl: 'max-age=36000'
    });
    const url = await response.ref.getDownloadURL();
    return { url, path };
  }

  private deleteImage(imagePath: string): Promise<void> {
    return this.storage.ref(imagePath).delete().toPromise();
  }

  private getNotesCollection(userId: string): AngularFirestoreCollection<Note> {
    return this.firestore.collection(`${USERS_COLLECTION}/${userId}/${NOTES_COLLECTION}`);
  }
}
