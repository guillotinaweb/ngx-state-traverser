import { Component } from '@angular/core';
import { GithubFile } from '../file/file.component';
import { Store } from '@ngrx/store';
import { RootState } from '../app.state';
import { TraverseToParent } from 'projects/ngx-state-traverser/src/public-api';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  parent = TraverseToParent<GithubFile>(this.store);

  constructor(private readonly store: Store<RootState>) { }

}
