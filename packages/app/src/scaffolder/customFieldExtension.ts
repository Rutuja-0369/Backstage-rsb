import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import { DynamicFieldLoader } from './DynamicFieldLoader';
import { scaffolderPlugin } from '@backstage/plugin-scaffolder';


export const DynamicFieldLoaderExt = scaffolderPlugin.provide(createScaffolderFieldExtension({
  name: 'DynamicFieldLoader',
  component: DynamicFieldLoader,
}));
