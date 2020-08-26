import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { NotesService } from '../../core/services/notes.service';
import * as NotesActions from './notes.actions';
import { catchError, first, map, mergeMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { of } from 'rxjs';
import { DialogService } from '../../core/modules/dialog/services/dialog.service';
import { Router } from '@angular/router';
import { ErrorSnackbarHelper } from '../../core/helpers';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable()
export class NotesEffects {

  private readonly errorActions = [
    NotesActions.loadNotesError,
    NotesActions.createNoteError,
    NotesActions.deleteNoteError,
    NotesActions.updateNoteError,
  ];

  constructor(
    private actions$: Actions,
    private notesService: NotesService,
    private dialogService: DialogService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  @Effect()
  loadNotes$ = this.actions$.pipe(
    ofType(NotesActions.loadNotes),
    mergeMap(({userId}) => fromPromise(this.notesService.getNotes(userId)).pipe(
      map(notes => NotesActions.loadNotesSuccess({notes})),
      catchError(error => of(NotesActions.loadNotesError({ message: error.message || error })))
    ))
  );

  @Effect()
  createNote$ = this.actions$.pipe(
    ofType(NotesActions.createNote),
    mergeMap(({form, userId}) => fromPromise(this.notesService.createNote(form, userId)).pipe(
      tap(note => this.router.navigate([note.id])),
      map(note => NotesActions.createNoteSuccess({note})),
      catchError(error => of(NotesActions.createNoteError({ message: error.message || error })))
    ))
  );

  @Effect()
  deleteNoteRequest$ = this.actions$.pipe(
    ofType(NotesActions.deleteNoteRequest),
    mergeMap(({note, userId}) => this.dialogService.showDeleteDialog('Delete this noteForm?').pipe(
      first(),
      map(del => {
        if (del) {
          this.router.navigate(['/']);
          return NotesActions.deleteNote({note, userId});
        }
        return NotesActions.deleteNoteRequestReject();
      }),
    ))
  );

  @Effect()
  deleteNote$ = this.actions$.pipe(
    ofType(NotesActions.deleteNote),
    mergeMap(({note, userId}) => fromPromise(this.notesService.deleteNote(note, userId)).pipe(
      map(() => NotesActions.deleteNoteSuccess()),
      catchError(error => of(NotesActions.deleteNoteError({ message: error.message || error, note })))
    ))
  );

  @Effect()
  updateNote$ = this.actions$.pipe(
    ofType(NotesActions.updateNote),
    mergeMap(({form, userId, note}) => fromPromise(this.notesService.updateNote(form, note, userId)).pipe(
      map(updatedNote => NotesActions.updateNoteSuccess({note: updatedNote})),
      catchError(error => of(NotesActions.updateNoteError({ message: error.message || error })))
    ))
  );

  @Effect({ dispatch: false })
  errorHandle$ = this.actions$.pipe(
    ofType(...this.errorActions),
    tap(({message}) => ErrorSnackbarHelper.showErrorSnackbar(this.snackbar, message))
  );

}
