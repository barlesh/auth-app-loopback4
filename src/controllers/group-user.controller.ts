import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Group,
  User,
} from '../models';
import {GroupRepository} from '../repositories';

export class GroupUserController {
  constructor(
    @repository(GroupRepository) protected groupRepository: GroupRepository,
  ) { }

  @get('/groups/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Group has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.groupRepository.users(id).find(filter);
  }

  @post('/groups/{id}/users', {
    responses: {
      '200': {
        description: 'Group model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Group.prototype.name,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInGroup',
            exclude: ['user_name'],
            optional: ['name']
          }),
        },
      },
    }) user: Omit<User, 'user_name'>,
  ): Promise<User> {
    return this.groupRepository.users(id).create(user);
  }

  @patch('/groups/{id}/users', {
    responses: {
      '200': {
        description: 'Group.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.groupRepository.users(id).patch(user, where);
  }

  @del('/groups/{id}/users', {
    responses: {
      '200': {
        description: 'Group.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.groupRepository.users(id).delete(where);
  }
}
