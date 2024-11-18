import { Resolver, Query, Mutation, Arg, Int, InputType, Field } from 'type-graphql';
import { User } from '../../models/User';
import { UserService } from '../../services/userService';

const userService = new UserService();

@InputType()
export class UserInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}

@Resolver()
export class UserResolver {
  // @Query(() => [User])
  // async users() {
  //     return await userService.getAllUsers();
  // }

  @Query(() => User, { nullable: true })
  async user(@Arg('id', () => Int) id: number) {
    return await userService.getUserById(id);
  }

  @Mutation(() => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    return await userService.createUser(name, email, password);
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg('id', () => Int) id: number,
    @Arg('data', () => UserInput) data: UserInput
  ) {
    return await userService.updateUser(id, data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Int) id: number) {
    return await userService.deleteUser(id);
  }
}
