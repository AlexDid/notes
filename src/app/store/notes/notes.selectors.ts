import { createFeatureSelector, createSelector } from '@ngrx/store';
import { notesFeatureKey, NotesState } from './notes.reducer';
import * as fromNotes from './notes.reducer';
import { selectMergedRoute } from '../router/router.selectors';
import { NOTE_ID_PARAM } from '../../notes/data';

export const getNotesFeatureState = createFeatureSelector<NotesState>(notesFeatureKey);

export const selectNotesListLoadingStatus = createSelector(
  getNotesFeatureState,
  (state: NotesState) => state?.loadingList
);

export const selectNoteUpdateStatus = createSelector(
  getNotesFeatureState,
  (state: NotesState) => state?.loadingNote
);

export const selectNotesDictionary = createSelector(
  getNotesFeatureState,
  fromNotes.adapter.getSelectors().selectEntities,
);

export const selectNotesArray = createSelector(
  selectNotesDictionary,
  (notes) => Object.values(notes)
);

export const selectCurrentNote = createSelector(
  selectNotesDictionary,
  selectMergedRoute,
  (notes, router) => router?.params
    ? notes[router.params[NOTE_ID_PARAM]]
    : null
);
