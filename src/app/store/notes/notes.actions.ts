import { createAction, props } from '@ngrx/store';
import { NoteDto, NotesDto } from './models';
import { ErrorDto, UserIdDto } from '../../core/models';
import { NoteForm } from '../../notes/models';

export const loadNotes = createAction(
  '[Notes] Load Notes',
  props<UserIdDto>()
);
export const loadNotesSuccess = createAction(
  '[Notes] Load Notes Success',
  props<NotesDto>()
);
export const loadNotesError = createAction(
  '[Notes] Load Notes Error',
  props<ErrorDto>()
);

export const createNote = createAction(
  '[Notes] Create Note',
  props<{form: NoteForm} & UserIdDto>()
);
export const createNoteSuccess = createAction(
  '[Notes] Create Note Success',
  props<NoteDto>()
);
export const createNoteError = createAction(
  '[Notes] Create Note Error',
  props<ErrorDto>()
);

export const deleteNoteRequest = createAction(
  '[Notes] Delete Note Request',
  props<NoteDto & UserIdDto>()
);
export const deleteNoteRequestReject = createAction(
  '[Notes] Delete Note Request Reject'
);
export const deleteNote = createAction(
  '[Notes] Delete Note',
  props<NoteDto & UserIdDto>()
);
export const deleteNoteSuccess = createAction(
  '[Notes] Delete Note Success'
);
export const deleteNoteError = createAction(
  '[Notes] Delete Note Error',
  props<ErrorDto & NoteDto>()
);

export const updateNote = createAction(
  '[Notes] Update Note',
  props<{form: NoteForm} & UserIdDto & NoteDto>()
);
export const updateNoteSuccess = createAction(
  '[Notes] Update Note Success',
  props<NoteDto>()
);
export const updateNoteError = createAction(
  '[Notes] Update Note Error',
  props<ErrorDto>()
);
