import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { GithubFile } from '../file/file.component';
import { TraverserSelectors, TraversingState } from 'ngx-state-traverser';

@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
})
export class FileInfoComponent {

  context = TraverserSelectors.TraverserContext<GithubFile>(this.store);

  constructor(private readonly store: Store<TraversingState>) { }

}
