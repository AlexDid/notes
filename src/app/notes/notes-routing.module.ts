import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NOTE_ID_PARAM } from './data';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      { path: '', pathMatch: 'full', component: NoteListComponent },
      { path: 'add-noteForm', component: NoteDetailsComponent },
      { path: `:${NOTE_ID_PARAM}`, component: NoteDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
