# ngx-state-traverser

[![Build Status](https://travis-ci.com/guillotinaweb/ngx-state-traverser.svg?branch=master)](https://travis-ci.com/guillotinaweb/ngx-state-traverser)

ngx-state-traverser brings [angular-traversal](https://github.com/guillotinaweb/angular-traversal) power to (ngrx)[https://ngrx.io/].

## Principle

Most of modern apps uses routing.

Routes are declared locally (like `/posts/{{id}}`), they are mapped to components (`PostComponent`), those components get the necessary information from the route and its parameters (like `/posts/2` is parsed as `posts` + `2` so we deduce the id 2 is a post id) in order to build the appropriate backend endpoint (probably something quite close to `https://my-backend.net/posts/2`). The backend response might contain an attribute like `relatedPost: "/posts/10"`), so in the template we can display a link like `<a routerLink="/posts/10">`.

Routes are not flexible (all the posts are supposed to be accessed with the `/posts` prefix), but even more annoyingly, they implies we know in advanced what will be the returned resource for a given link in order to render it properly.

That's the opposite of web. When navigating on the web, any link might lead to any kind of resource (maybe another page? maybe a file? we don't know, and the browser does not need to know in advanced), at the time we click and then load the resource, depending on its type, the browser will behave accordingly.

Traversing replaces routing by implementing the same principle. Instead of mapping routes to components, we map resource types to component, and when we load the resource (whatever it is), we use the appropriate component to render it.

It also allows to map several views for a given type (like the `@@edit` view for a post will use a different component than the default view).

## Type mapping

We declare some views for our data type (`view` is the default view name):

```
traverser.addView('view', 'post', PostComponent);
traverser.addView('edit', 'post', EditPostComponent);
traverser.addView('view', 'user', UserProfileComponent);
```

Then the app is able to expose the following pathes:

- http://localhost:4200/introduction
- http://localhost:4200/introduction/@@edit
- http://localhost:4200/2019/07/new-post
- http://localhost:4200/eric

(assuming the backend exposes /introduction, 2019/07/new-post, and /eric as posts and user profile)

The `<traverser-outlet></traverser-outlet>` will load the current context according the current path, and instanciate the component corresponding to the context type (and view).

## Navigate

Any template might contain some links like:

```
<a traverseTo="/2019/07/new-post">
<a [traverseTo]="relatedPost">
<a traverseTo="..">
```

Note: here and later on, the provided link can be either a full path (`/2019/07/new-post`), a relative path (`../eric`), or a backend URL (`https://my-backend.net/introduction`).

In code, we can navigate by dispatching an action:

```
this.store.dispatch(new TraverserActions.Traverse('../eric'))
```

## Get the current context

The component gets the `context` from the state.

We can be the raw context (`any`) using the `getContext` selector:

```
context = this.store.pipe(select(TraverserSelectors.getContext));
```

But the `TraverserContext` function allows to get a typed context:

```
context = TraverserSelectors.TraverserContext<UserProfile>(this.store);
```

## Accessing other resources

Sometimes the current context does not contain all the information we need.

Let's say we need the list of all the posts from the current month when displaying a given post.

We can get the folder content from the state:

```
folder = TraverserSelectors.TraverseTo<Folder>(this.store, '..');
```

Assuming the current context path is `/2019/07/10`, it retrieves the content of `/2019/07`.

All the traversed resources are stored in the state, but if the requested resource is not yet in the state, the `TraverserResource()` function will load it from backend.

As the state acts as a cache system, it can be cleaned on demand:

```
this.store.dispatch(new TraverserActions.CleanTraverserResources(['../eric', '/2019/*']))
```

And it can be updated:

```
this.store.dispatch(new TraverserActions.UpdateTraverserResource({
    path: '/2019/07/03',
    changes: {
        title: "New title"
    }
}));
```

## Tiles

With `angular-traversal`, we manage the main page view, but it also allows to define small blocks within the current page (named tiles).

See the [angular-traversal documentation](https://github.com/guillotinaweb/angular-traversal#tiles) for more details.

We can load a context in a tile by doing:

```typescript
this.store.dispatch(new TraverserActions.LoadTile({tile: 'details', path}));
```
