import { findUserService, loginService, registerService } from '../services/auth.service';
import {
  countAllEvents,
  createEventService,
  deleteEventService,
  findAllEventService,
  findOneEventService,
  updateEventService
} from '../services/event.service';
import {
  createRoleService,
  deleteRoleService,
  findAllRolesService,
  updateRoleServise
} from '../services/role.services';
import { EventInput } from '../types/EventInput';

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      const userId = context.user?.userId;
      if (!userId) return null;
      return await findUserService(userId);
    },
    role: async () => {
      return await findAllRolesService();
    },
    events: async (_: any, args: { filters?: any, skip?: number, take?: number }) => {
      const data = await findAllEventService(args.filters, args.skip, args.take);
      const totalCount = await countAllEvents(args.filters);
      return {
        data,
        totalCount
      }
    },
    event: async (_: any, args: { id: string }) => {
      return await findOneEventService(args.id);
    }
  },

  Mutation: {
    register: async (_: any, args: { name: string; email: string; password: string }) => {
      const { name, email, password } = args;
      const token = await registerService(name, email, password);
      return { token };
    },

    login: async (_: any, args: { email: string; password: string }) => {
      const { email, password } = args;
      const token = await loginService(email, password);
      return { token };
    },

    createRole: async (_: any, args: { name: string }) => {
      const newRole = await createRoleService(args.name);
      return newRole;
    },

    deleteRole: async (_: any, args: { id: string }) => {
      return await deleteRoleService(args.id);
    },

    updateRole: async (_: any, args: { id: string, name: string }) => {
      return await updateRoleServise(args.id, args.name);
    },

    createEvent: async (_: any, args: { input: EventInput }) => {
      return await createEventService(args.input);
    },

    updateEvent: async (_: any, args: { id: string, input: Partial<EventInput> }) => {
      const { id, input } = args;
      return await updateEventService(id, input);
    },

    deleteEvent: async (_: any, args: {id: string}) => {
      return await deleteEventService(args.id);
    }
  }
};
