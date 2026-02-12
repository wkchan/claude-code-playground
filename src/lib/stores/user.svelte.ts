import { MOCK_USERS } from '../data/users.js';
import type { User } from '../types/index.js';

export const currentUser = $state<User>(MOCK_USERS[0]);
