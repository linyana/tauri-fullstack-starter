import { t } from 'elysia';

export const CreateProjectSchema = {
  body: t.Object({
    name: t.String(),
  }),
};

export type ICreateProjectRequestType = typeof CreateProjectSchema.body.static;
