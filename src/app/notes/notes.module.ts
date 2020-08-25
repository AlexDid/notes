import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteListItemComponent } from './note-list/note-list-item/note-list-item.component';
import { HeaderModule } from '../shared/modules/header/header.module';


@NgModule({
  declarations: [NotesComponent, NoteDetailsComponent, NoteListComponent, NoteListItemComponent],
  imports: [
    CommonModule,
    NotesRoutingModule,
    HeaderModule
  ]
})
export class NotesModule { }
