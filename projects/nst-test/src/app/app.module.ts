import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TraversalModule } from 'angular-traversal';
import { Resolver } from 'angular-traversal';
import { Marker } from 'angular-traversal';
import { Normalizer } from 'angular-traversal';
import { BasicHttpResolver, BACKEND_BASE_URL } from 'angular-traversal';

import { FullPathNormalizer } from './normalizer';
import { TypeMarker } from './marker';

import { AppComponent } from './app.component';
import { FileComponent } from './file/file.component';
import { FolderComponent } from './folder/folder.component';
import { FileInfoComponent } from './file-info/file-info.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StateTraverserModule } from 'ngx-state-traverser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { FolderDetailsComponent } from './folder/folder-details.component';
import { NoDetailsComponent } from './no-details.component';

@NgModule({
    declarations: [
        AppComponent,
        FileComponent,
        FolderComponent,
        FileInfoComponent,
        NavigationComponent,
        FolderDetailsComponent,
        NoDetailsComponent,
    ],
    imports: [
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        }),
        EffectsModule.forRoot([]),
        BrowserModule,
        FormsModule,
        HttpClientModule,
        TraversalModule,
        StateTraverserModule,
    ],
    providers: [
        { provide: Resolver, useClass: BasicHttpResolver },
        { provide: BACKEND_BASE_URL, useValue: 'https://api.github.com/repos' },
        { provide: Marker, useClass: TypeMarker },
        { provide: Normalizer, useClass: FullPathNormalizer },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
