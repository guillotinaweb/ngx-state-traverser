import { Component } from '@angular/core';
import { Traverser } from 'angular-traversal';
import { FileComponent } from './file/file.component';
import { FileInfoComponent } from './file-info/file-info.component';
import { FolderComponent } from './folder/folder.component';
import { Store } from '@ngrx/store';
import { RootState } from './app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  repository = 'guillotinaweb/angular-traversal';

  constructor(
    private readonly store: Store<RootState>,
    traverser: Traverser,
  ) {
    this.store.dispatch({ type: '[Traversing] Watch'});
    traverser.addView('view', 'file', FileComponent);
    traverser.addView('info', 'file', FileInfoComponent);
    traverser.addView('view', 'dir', FolderComponent);
  }
}
