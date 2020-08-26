import { Component, OnInit } from '@angular/core';
import { Note, NoteForm } from '../models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import * as NotesActions from '../../store/notes/notes.actions';
import { SubscriptionComponent, User } from '../../core/models';
import { selectUserInfo } from '../../store/auth/auth.selectors';
import { selectCurrentNote, selectNoteUpdateStatus } from '../../store/notes/notes.selectors';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent extends SubscriptionComponent implements OnInit {

  noteForm: NoteForm = {
    content: '',
    imageBase64: null,
    timestamp: Date.now()
  };

  note: Note;

  showSpinner = false;

  private user: User;

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCurrentNote();
    this.getLoadingStatus();
    this.getCurrentUser();
  }

  updateContent(content: string): void {
    this.noteForm = {
      ...this.noteForm,
      content
    };
    this.updateDate();
  }

  updateImage(imageBase64: string): void {
    this.noteForm = {
      ...this.noteForm,
      imageBase64
    };
    this.updateDate();
  }

  save(): void {
    this.note ? this.updateNote() : this.createNote();
  }

  private updateDate(): void {
    this.noteForm.timestamp = Date.now();
  }

  private createNote(): void {
    this.store.dispatch(NotesActions.createNote({
      form: this.noteForm,
      userId: this.user.id
    }));
  }

  private updateNote(): void {
    this.store.dispatch(NotesActions.updateNote({
      form: this.noteForm,
      userId: this.user.id,
      note: this.note
    }));
  }

  private getCurrentUser(): void {
    this.store.select(selectUserInfo).pipe(
      this.getTakeUntilPipe()
    ).subscribe(user => this.user = user);
  }

  private getLoadingStatus(): void {
    this.store.select(selectNoteUpdateStatus).pipe(
      this.getTakeUntilPipe()
    ).subscribe(loading => this.showSpinner = loading);
  }

  private getCurrentNote(): void {
    this.store.select(selectCurrentNote).pipe(
      this.getTakeUntilPipe()
    ).subscribe(note => {
      this.note = note;
      if (note) {
        this.noteForm = {
          ...this.noteForm,
          timestamp: note.timestamp,
          content: note.content
        };
      }
    });
  }
}
