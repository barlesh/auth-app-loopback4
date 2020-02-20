import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model({settings: {strict: false}})
export class Group extends Entity {
  @property({
    type: 'string',
    default: 'group',
  })
  group?: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  name: string;

  @hasMany(() => User, {keyTo: 'name'})
  users: User[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Group>) {
    super(data);
  }
}

export interface GroupRelations {
  // describe navigational properties here
}

export type GroupWithRelations = Group & GroupRelations;
