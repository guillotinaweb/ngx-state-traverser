import { Target } from 'angular-traversal';

export type SerializableTarget = Exclude<Target, 'component'>;
