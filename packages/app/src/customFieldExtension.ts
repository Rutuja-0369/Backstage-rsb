import { createScaffolderFieldExtension } from '@backstage/plugin-scaffolder-react';
import { DynamicFieldLoader } from './DynamicFieldLoader';


export const dynamicFieldLoader = createScaffolderFieldExtension({
  name: 'dynamicFieldLoader',
  component: DynamicFieldLoader,
});
