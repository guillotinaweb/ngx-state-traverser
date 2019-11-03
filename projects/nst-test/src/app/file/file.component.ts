import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { TraverserSelectors, TraversingState } from 'ngx-state-traverser';

export class GithubFile {
    content?: string;
    name?: string;
}

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  name = '';
  code = '';
  path = this.store.select(TraverserSelectors.getTarget).pipe(map(target => target.path.split('?')[0]));
  // will work in any level-2 file
  readme = TraverserSelectors.TraverseTo<GithubFile>(this.store, '../../README.md').pipe(map(f => f.name));

  constructor(private readonly store: Store<TraversingState>) { }

  ngOnInit() {
    TraverserSelectors.TraverserContext<GithubFile>(this.store).subscribe(context => {
      this.name = context.name || '';
      if (!!context.content) {
        this.code = atob(context.content);
      } else {
        this.code = '';
      }
    });
  }

}
