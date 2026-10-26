import { EventEmitter } from 'node:events';
const bus = new EventEmitter();
// Every event shares one envelope: { type, publishId, at, ...payload }
export const publish = (type, payload) => bus.emit(type, { type, at: new Date().toISOString(), ...payload });
export const subscribe = (type, handler) => bus.on(type, handler);
