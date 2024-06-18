export interface UserModel {
        userId: string;
        username: string;
        email: string;
        roles: string[];
        token?: string; 
      }