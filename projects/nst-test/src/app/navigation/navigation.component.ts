import { Component } from '@angular/core';
import { GithubFile } from '../file/file.component';
import { Store } from '@ngrx/store';
import { TraverserSelectors, TraverserState } from 'ngx-state-traverser';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {

  parent = TraverserSelectors.TraverseToParent<GithubFile>(this.store);

  constructor(private readonly store: Store<TraverserState>) { }

}
