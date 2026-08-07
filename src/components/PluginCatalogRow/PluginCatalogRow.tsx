import type { FC } from 'react';
import { Flex, Typography } from '@forgedevstack/bear';
import type { PluginCatalogRowProps } from './PluginCatalogRow.types';

export const PluginCatalogRow: FC<PluginCatalogRowProps> = (props) => {
  const { name, npmUrl, gitUrl, npmLabel, gitLabel } = props;

  return (
    <Flex align="center" justify="between" gap={3} className="ink-plugin-row">
      <Typography variant="body1" className="font-semibold m-0">
        {name}
      </Typography>
      <Flex align="center" gap={2} className="ink-plugin-row__links">
        <a
          href={npmUrl}
          target="_blank"
          rel="noreferrer"
          className="ink-plugin-row__icon-link"
          title={npmLabel}
          aria-label={npmLabel}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
          </svg>
        </a>
        <a
          href={gitUrl}
          target="_blank"
          rel="noreferrer"
          className="ink-plugin-row__icon-link"
          title={gitLabel}
          aria-label={gitLabel}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.12-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.248 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.479 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </a>
      </Flex>
    </Flex>
  );
};
