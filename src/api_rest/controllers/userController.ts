import { Request, Response } from 'express';
import { UserService } from '../../services/userService';

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if email already exists
  const existingUser = await userService.checkEmailExists(email);
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists.' });
  }

  try {
    const user = await userService.createUser(name, email, password);
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (e: any) {
    return res.status(500).json({ message: 'Error saving user.', error: e.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }

  try {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (e: any) {
    res.status(500).json({ message: 'Error fetching user.', error: e.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }
  try {
    const user = await userService.updateUser(id, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'User updated successfully.' });
  } catch (e: any) {
    res.status(500).json({ message: 'Error updating user.', error: e.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }
  try {
    const success = await userService.deleteUser(Number(req.params.id));
    if (!success) throw new Error('User not found');
    res.json({ message: 'User deleted successfully.' });
  } catch (error: any) {
    res.status(400).json({ message: (error as Error).message });
  }
};
