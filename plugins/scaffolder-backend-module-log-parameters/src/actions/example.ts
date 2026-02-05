import { createTemplateAction } from '@backstage/plugin-scaffolder-node';

/**
 * Creates an `acme:example` Scaffolder action.
 *
 * @remarks
 *
 * See {@link https://example.com} for more information.
 *
 * @public
 */
export function createExampleAction() {
  // For more information on how to define custom actions, see
  //   https://backstage.io/docs/features/software-templates/writing-custom-actions
  return createTemplateAction({
    id: 'acme:example',
    description: 'Runs an example action',
    schema: {
      input: {
        myParameter: z =>
          z.string({
            description:
              "This is an example parameter, don't set it to foo",
          }),
      },
    },
    async handler(ctx) {
      ctx.logger.info(
        `Running example template with parameters: ${ctx.input.myParameter}`,
      );

      if (ctx.input.myParameter === 'foo') {
        throw new Error(`myParameter cannot be 'foo'`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    },
  });
}


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
