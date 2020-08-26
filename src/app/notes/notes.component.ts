import { Component, OnInit } from '@angular/core';
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth/auth.actions';
import * as NotesActions from '../store/notes/notes.actions';
import { selectUserInfo } from '../store/auth/auth.selectors';
import { filter, first } from 'rxjs/operators';
import { SubscriptionComponent } from '../core/models';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent extends SubscriptionComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.updateLoggedUser();
    this.loadNotes();
  }

  private updateLoggedUser(): void {
    this.store.dispatch(AuthActions.checkLoginStatus());
  }

  private loadNotes(): void {
    this.store.select(selectUserInfo).pipe(
      filter(user => !!user),
      first(),
      this.getTakeUntilPipe()
    ).subscribe(user => this.store.dispatch(NotesActions.loadNotes({ userId: user.id })));
  }

}
