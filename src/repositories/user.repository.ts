import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {User, UserRelations, Group} from '../models';
import {MysqlUsersDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {GroupRepository} from './group.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.user_name,
  UserRelations
> {

  public readonly group: BelongsToAccessor<Group, typeof User.prototype.user_name>;

  constructor(
    @inject('datasources.mysql_users') dataSource: MysqlUsersDataSource, @repository.getter('GroupRepository') protected groupRepositoryGetter: Getter<GroupRepository>,
  ) {
    super(User, dataSource);
    this.group = this.createBelongsToAccessorFor('group', groupRepositoryGetter,);
    this.registerInclusionResolver('group', this.group.inclusionResolver);
  }
}
