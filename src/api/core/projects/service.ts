import { prisma } from '@api/utils';
import { ICreateProjectRequestType } from '@shared';

class ProjectService {
  async getProjects() {
    const projects = await prisma.projects.findMany();
    return projects;
  }

  async createProject(ctx: { body: ICreateProjectRequestType }) {
    const { body } = ctx;

    const project = await prisma.projects.create({
      data: body,
    });
    return project;
  }
}

export const projectService = new ProjectService();
