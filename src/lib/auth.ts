export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(email: string, password: string): Promise<User> {
    await delay(800);
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('movieapp_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('movieapp_user', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  async register(name: string, email: string, password: string): Promise<User> {
    await delay(800);
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('movieapp_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('movieapp_users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('movieapp_user', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  logout(): void {
    localStorage.removeItem('movieapp_user');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('movieapp_user');
    return userStr ? JSON.parse(userStr) : null;
  }
};