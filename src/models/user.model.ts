import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Group} from './group.model';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  first_name: string;

  @property({
    type: 'string',
    required: true,
  })
  last_name: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  user_name: string;

  @property({
    type: 'string',
    required: true,
    default: 'cyber-analyst',
  })
  role: string;

  @property({
    type: 'string',
    required: true,
  })
  hashed_password: string;

  @property({
    type: 'date',
    required: true,
  })
  password_creation_time: string;

  @property({
    type: 'date',
    required: true,
  })
  creation_time: string;

  @property({
    type: 'date',
    required: true,
  })
  update_time: string;

  @property({
    type: 'number',
    required: true,
    default: 30,
  })
  password_expiration_period: number;

  @belongsTo(() => Group, {name: 'group'})
  name: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
