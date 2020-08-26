import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MdEditorOption } from 'ngx-markdown-editor';
import { BehaviorSubject } from 'rxjs';
import { SubscriptionComponent } from '../../../core/models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent extends SubscriptionComponent implements OnInit {

  @Input()
  set content(content: string) {
    this.content$.next(content);
  }

  get content(): string {
    return this.content$.value;
  }

  @Output()
  contentChange = new EventEmitter<string>();

  editorOptions: MdEditorOption = {
    hideIcons: ['Image']
  };

  private content$ = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.subscribeOnContentChange();
  }

  private subscribeOnContentChange(): void {
    this.content$.asObservable().pipe(
      debounceTime(500),
      distinctUntilChanged(),
      this.getTakeUntilPipe()
    ).subscribe(content => this.contentChange.emit(content));
  }

}
