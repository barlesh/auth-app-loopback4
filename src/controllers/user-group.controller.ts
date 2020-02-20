import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Group,
} from '../models';
import {UserRepository} from '../repositories';

export class UserGroupController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/group', {
    responses: {
      '200': {
        description: 'Group belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Group)},
          },
        },
      },
    },
  })
  async getGroup(
    @param.path.string('id') id: typeof User.prototype.user_name,
  ): Promise<Group> {
    return this.userRepository.group(id);
  }
}
