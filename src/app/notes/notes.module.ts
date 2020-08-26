import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteListItemComponent } from './note-list/note-list-item/note-list-item.component';
import { HeaderModule } from '../shared/modules/header/header.module';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropperComponent } from './note-details/image-cropper/image-cropper.component';
import { MarkdownEditorComponent } from './note-details/markdown-editor/markdown-editor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    NotesComponent,
    NoteDetailsComponent,
    NoteListComponent,
    NoteListItemComponent,
    ImageCropperComponent,
    MarkdownEditorComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    HeaderModule,
    FormsModule,
    LMarkdownEditorModule,
    ImageCropperModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class NotesModule { }
