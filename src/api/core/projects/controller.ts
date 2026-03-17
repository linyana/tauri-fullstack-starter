import Elysia, { t } from 'elysia';
import { projectService } from './service';
import { CreateProjectSchema } from '@shared';

export const projectController = new Elysia({ prefix: '/projects' })
  .get('/', projectService.getProjects)
  .post('/', (ctx) => projectService.createProject(ctx), CreateProjectSchema);
