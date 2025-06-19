import { login, register } from '../services/auth.service';
import { createRole, deleteRole, findAllRoles, findOneRole, updateRole } from '../services/role.services';

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      const userId = context.user?.userId;
      if (!userId) return null;
      return await findOneRole(userId);
    },
    role: async () => {
      return await findAllRoles();
    }
  },

  Mutation: {
    register: async (_: any, args: { name: string; email: string; password: string }) => {
      const { name, email, password } = args;
      const token = await register(name, email, password);
      return { token };
    },

    login: async (_: any, args: { email: string; password: string }) => {
      const { email, password } = args;
      const token = await login(email, password);
      return { token };
    },

    createRole: async (_: any, args: {name: string}) => {
      const newRole = await createRole(args.name);
      return newRole;
    },

    deleteRole: async (_: any, args: { id: string }) => {
      return await deleteRole(args.id);
    },

    updateRole: async (_: any, args: { id: string, name: string }) => {
      return await updateRole(args.id, args.name);
    }
  }
};
