import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolver, BACKEND_BASE_URL } from 'angular-traversal';
import { StateResolver, TraversingState, StateFirst } from 'ngx-state-traverser';
import { Store } from '@ngrx/store';

@Injectable()
export class BackendResolver extends Resolver implements StateFirst {

    constructor(
        private http: HttpClient,
        public store: Store<TraversingState>,
        @Inject(BACKEND_BASE_URL) private backend: string,
    ) {
        super();
    }

    @StateResolver({
        maxAge: 10 * 1000,
    })
    resolve(path: string, view: string, queryString?: string): Observable<any> {
        const headers = new HttpHeaders()
            .append('Accept', 'application/json')
            .append('Content-Type', 'application/json');
        return this.http.get(this.backend + path, { headers });
    }
}
