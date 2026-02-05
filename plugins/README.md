import { createTemplateAction } from '@backstage/plugin-scaffolder-backend';

export const logParametersAction = createTemplateAction({
  id: 'custom:log-parameters',
  schema: {
    input: {
      type: 'object',
      properties: {
        parameters: {
          type: 'object',
          description: 'Parameters to log',
        },
      },
    },
  },
  async handler(ctx) {
    ctx.logger.info('Template Parameters:', {
      gitUrl: ctx.input.parameters.gitUrl,
      branch: ctx.input.parameters.branch,
      applicationType: ctx.input.parameters.applicationType,
      codebase: ctx.input.parameters.codebase,
      // Mask sensitive data
      gitCredentials: '***' 
    });
  },
});