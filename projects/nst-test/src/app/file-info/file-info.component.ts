import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootState } from '../app.state';
import { GithubFile } from '../file/file.component';
import { TraverserContext } from 'ngx-state-traverser';

@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
})
export class FileInfoComponent {

  context = TraverserContext<GithubFile>(this.store);

  constructor(private readonly store: Store<RootState>) { }

}
