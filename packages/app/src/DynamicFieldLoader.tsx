// DynamicFieldLoader.tsx
import React, { useEffect, useRef } from 'react';
import { FieldExtensionComponentProps } from '@backstage/plugin-scaffolder-react';

export const DynamicFieldLoader = (props: FieldExtensionComponentProps<string, { url: string; elementName: string }>) => {
  const ref = useRef<HTMLDivElement>(null);
  const { url, elementName } = props.uiSchema['ui:options'] || {};
   console.log('DynamicFieldLoader props:', props,elementName, url);
  useEffect(() => {
    const loadPlugin = async () => {
      if (!url || !elementName) return;

      const res = await fetch(url);
      const pluginJson = await res.json();
      const { entry } = pluginJson;

      // Load JS & CSS
      entry.src.forEach((src: string) => {
        if (src.endsWith('.js')) {
          const script = document.createElement('script');
          script.src = src;
          script.type = 'module';
          script.defer = true;
          document.head.appendChild(script);
        } else if (src.endsWith('.css')) {
          const link = document.createElement('link');
          link.href = src;
          link.rel = 'stylesheet';
          document.head.appendChild(link);
        }
      });

      // Wait and then inject the custom element
      setTimeout(() => {
        if (ref.current) {
          const el = document.createElement(elementName);
          ref.current.innerHTML = ''; // clear before append
          ref.current.appendChild(el);
        }
      }, 1000);
    };

    loadPlugin();
  }, [url, elementName]);

  return (
    <div>
      <label>{props.schema.title}</label>
      <div ref={ref} />
    </div>
  );
};
