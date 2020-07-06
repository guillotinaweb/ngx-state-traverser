import { reducer } from './reducer';
import { initialState } from './state';
import { TraverserActions } from './actions';

describe('Traverser reducer', () => {

    it('should update current target when resolving context and store it in collection', () => {
        const state = reducer(initialState, new TraverserActions.ResolveContext({
            path: '/rey',
            contextPath: '/rey',
            view: 'view',
            prefixedContextPath: '/rey',
            prefixedPath: '/rey',
            component: null,
            context: {
                jedi: 'Rey',
            }
        }));
        expect(state.target.context.jedi).toBe('Rey');
        expect(state.collection['/rey'].jedi).toBe('Rey');
    });

    it('should set to pending when traversing', () => {
        const state = reducer(initialState, new TraverserActions.Traverse('/luke'));
        expect(state.collection['/luke'].isPending).toBe(true);
    });

    it('should update store object in collection when resolving', () => {
        const state = reducer(initialState, new TraverserActions.Resolve({
            path: '/luke',
            object: {
                jedi: 'Luke',
            }
        }));
        expect(state.collection['/luke'].jedi).toBe('Luke');
    });

    it('should clean collection', () => {
        const state1 = reducer(initialState, new TraverserActions.Resolve({
            path: '/episode4/luke',
            object: {
                jedi: 'Luke',
            }
        }));
        const state2 = reducer(state1, new TraverserActions.Resolve({
            path: '/episode4/yoda',
            object: {
                jedi: 'Yoda',
            }
        }));
        const state3 = reducer(state2, new TraverserActions.Resolve({
            path: '/episode7/rey',
            object: {
                jedi: 'Rey',
            }
        }));
        expect(Object.keys(state3.collection)).toEqual(['/episode4/luke', '/episode4/yoda', '/episode7/rey']);
        const state4 = reducer(state3, new TraverserActions.CleanTraverserResources(['/episode4/*']));
        expect(Object.keys(state4.collection)).toEqual(['/episode7/rey']);
    });

    it('should merge changes in collection', () => {
        const state1 = reducer(initialState, new TraverserActions.Resolve({
            path: '/luke',
            object: {
                jedi: 'Luke',
                midichlorians: 'high',
                father: {
                    name: 'Vador',
                }
            }
        }));
        const state2 = reducer(state1, new TraverserActions.UpdateTraverserResource({
            path: '/luke',
            changes: {
                father: {
                    name: 'Anakin'
                },
            }
        }));
        expect(state2.collection['/luke'].father.name).toEqual('Anakin');
        expect(state2.collection['/luke'].midichlorians).toEqual('high');
    });

    it('should update context when updating collection if same path', () => {
        const state1 = reducer(initialState, new TraverserActions.ResolveContext({
            path: '/rey',
            contextPath: '/rey',
            view: 'view',
            prefixedContextPath: '/rey',
            prefixedPath: '/rey',
            component: null,
            context: {
                jedi: 'Rey',
                father: {
                    name: 'Unknown'
                },
            }
        }));
        const state2 = reducer(state1, new TraverserActions.UpdateTraverserResource({
            path: '/rey',
            changes: {
                father: {
                    name: 'Skywalker'
                },
            }
        }));
        expect(state2.collection['/rey'].father.name).toEqual('Skywalker');
        expect(state2.target.context.father.name).toEqual('Skywalker');
    });

    it('should add or update collection', () => {
        const state1 = reducer(initialState, new TraverserActions.Resolve({
            path: '/luke',
            object: {
                jedi: 'Luke',
                midichlorians: 'high',
                father: {
                    name: 'Vador',
                }
            }
        }));
        const state2 = reducer(state1, new TraverserActions.AddOrUpdateTraverserResources([
            {
                path: '/luke',
                changes: {
                    father: {
                        name: 'Anakin'
                    },
                }
            },
            {
                path: '/leia',
                changes: {
                    midichlorians: 'high',
                    father: {
                        name: 'Anakin'
                    },
                }
            },
        ]));
        expect(state2.collection['/luke'].father.name).toEqual('Anakin');
        expect(state2.collection['/luke'].midichlorians).toEqual('high');
        expect(state2.collection['/leia'].midichlorians).toEqual('high');
    });

    it('should update context when batch updating collection if same path', () => {
        const state1 = reducer(initialState, new TraverserActions.ResolveContext({
            path: '/rey',
            contextPath: '/rey',
            view: 'view',
            prefixedContextPath: '/rey',
            prefixedPath: '/rey',
            component: null,
            context: {
                jedi: 'Rey',
                father: {
                    name: 'Unknown'
                },
            }
        }));
        const state2 = reducer(state1, new TraverserActions.AddOrUpdateTraverserResources([{
            path: '/rey',
            changes: {
                father: {
                    name: 'Skywalker'
                },
            }
        }]));
        expect(state2.collection['/rey'].father.name).toEqual('Skywalker');
        expect(state2.target.context.father.name).toEqual('Skywalker');
    });
});
