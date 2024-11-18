import { User } from '../models/User';

export class UserService {
  async checkEmailExists(email: string): Promise<User | null> {
    return User.findOneBy({ email });
  }

  async createUser(name: string, email: string, password: string): Promise<User> {
    const user = User.create({ name, email, password });
    await user.save();
    return user;
  }

  async getUserById(id: number): Promise<User | null> {
    // return User.findOneBy(id);
    return User.findOne({
      where: { id },
      select: ['id', 'name', 'email'],
    });
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    const user = await User.findOneBy({ id });
    if (!user) return null;
    Object.assign(user, data);
    if (data.password) {
      await user.hashPassword();
    }
    await user.save();
    return user;
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await User.delete(id);
    return result.affected !== 0;
  }
}
