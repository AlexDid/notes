import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Note } from '../../notes/models';
import * as NotesActions from './notes.actions';


export const notesFeatureKey = 'notes';

export interface NotesState extends EntityState<Note> {
  loadingList: boolean;
  loadingNote: boolean;
}

export const adapter = createEntityAdapter<Note>({
  sortComparer: (a, b) => a.timestamp - b.timestamp
});

export const initialState: NotesState = adapter.getInitialState({
  loadingList: false,
  loadingNote: false
});


export const reducer = createReducer(
  initialState,

  on(NotesActions.loadNotes, state => ({
    ...state,
    loadingList: true
  })),
  on(NotesActions.loadNotesSuccess, (state, {notes}) => adapter.setAll(notes, {...state, loadingList: false})),
  on(NotesActions.loadNotesError, state => ({
    ...state,
    loadingList: false
  })),

  on(NotesActions.createNote, state => ({
    ...state,
    loadingNote: true
  })),
  on(NotesActions.createNoteSuccess, (state, {note}) => adapter.upsertOne(note, {
    ...state,
    loadingNote: false
  })),
  on(NotesActions.createNoteError, state => ({
    ...state,
    loadingNote: false
  })),

  on(NotesActions.deleteNote, (state, {note}) => adapter.removeOne(note.id, state)),
  on(NotesActions.deleteNoteError, (state, {note}) => adapter.upsertOne(note, state)),

  on(NotesActions.updateNote, state => ({
    ...state,
    loadingNote: true
  })),
  on(NotesActions.updateNoteSuccess, (state, {note}) => adapter.upsertOne(note, {
    ...state,
    loadingNote: false
  })),
  on(NotesActions.updateNoteError, state => ({
    ...state,
    loadingNote: false
  })),

);

export function notesReducer(state: NotesState | undefined, action: Action): NotesState {
  return reducer(state, action);
}
