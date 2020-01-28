import { Component } from '@angular/core';
import { Traverser } from 'angular-traversal';
import { FileComponent } from './file/file.component';
import { FileInfoComponent } from './file-info/file-info.component';
import { FolderComponent } from './folder/folder.component';
import { Store } from '@ngrx/store';
import { TraversingState, TraverserActions } from 'ngx-state-traverser';
import { FolderDetailsComponent } from './folder/folder-details.component';
import { NoDetailsComponent } from './no-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  repository = 'guillotinaweb/angular-traversal';

  constructor(
    private readonly store: Store<TraversingState>,
    traverser: Traverser,
  ) {
    this.store.dispatch({ type: TraverserActions.Types.Watch});
    traverser.addView('view', 'file', FileComponent);
    traverser.addView('info', 'file', FileInfoComponent);
    traverser.addView('view', 'dir', FolderComponent);
    traverser.addTile('details', '*', NoDetailsComponent);
    traverser.addTile('details', 'dir', FolderDetailsComponent);
  }
}
