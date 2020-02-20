import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Group, GroupRelations, User} from '../models';
import {MysqlUsersDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class GroupRepository extends DefaultCrudRepository<
  Group,
  typeof Group.prototype.name,
  GroupRelations
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Group.prototype.name>;

  constructor(
    @inject('datasources.mysql_users') dataSource: MysqlUsersDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Group, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
