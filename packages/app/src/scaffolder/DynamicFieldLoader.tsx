import React, { useEffect, useRef } from 'react';
import { FieldExtensionComponentProps } from '@backstage/plugin-scaffolder-react';

let globalCustomElement: HTMLElement | null = null; // Persisted across mounts

export const DynamicFieldLoader = (
  props: FieldExtensionComponentProps<string, { url: string; elementName: string }>
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { url, elementName } = props.uiSchema['ui:options'] || {};

  useEffect(() => {
    const loadPlugin = async () => {
      if (!url || !elementName) return;

      const res = await fetch(url);
      const pluginJson = await res.json();
      const { entry } = pluginJson;

      // Load JS & CSS only if not already present
      entry.src.forEach((src: string) => {
        if (src.endsWith('.js')) {
          if (!document.querySelector('base')) {
            const base = document.createElement('base');
            base.setAttribute('href', '/');
            document.head.appendChild(base);
          }
          if (!document.querySelector(`script[src="${src}"]`)) {
            const script = document.createElement('script');
            script.src = src;
            document.head.appendChild(script);
          }
        } else if (src.endsWith('.css')) {
          if (!document.querySelector(`link[href="${src}"]`)) {
            const link = document.createElement('link');
            link.href = src;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
          }
        }
      });

      // Persist the custom element globally
      if (!globalCustomElement) {
        globalCustomElement = document.createElement(elementName);
      }

      // Attach the persisted element to the current ref
      if (ref.current && !ref.current.contains(globalCustomElement)) {
        ref.current.innerHTML = '';
        ref.current.appendChild(globalCustomElement);
      }
    };

    loadPlugin();

    // Do NOT clean up the element on unmount to persist it
  }, [url, elementName]);

  return (
    <div>
      <label>{props.schema.title}</label>
      <div ref={ref} />
    </div>
  );
};