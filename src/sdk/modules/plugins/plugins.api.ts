import { INK_API_URL } from '@const/billing.const';
import { PUBLIC_PLUGINS_PATH } from '@const/plugins.const';
import type { InkPluginCatalogEntry } from '@const/plugins.const';
import { useApi } from '@sdk/http';
import type { PluginApiRow, PluginCatalogResponse } from './plugins.types';

const EMPTY_CATALOG: InkPluginCatalogEntry[] = [];

const toEntry = (row: PluginApiRow): InkPluginCatalogEntry => ({
  id: row.slug || row.id,
  name: row.name,
  packageName: row.packageName,
  npmUrl: row.npmUrl,
  gitUrl: row.gitUrl,
  description: row.description,
});

export const fetchPluginCatalog = async (): Promise<InkPluginCatalogEntry[]> => {
  const response = await useApi(
    `${INK_API_URL}${PUBLIC_PLUGINS_PATH}`,
    undefined,
    { silent: true, onError: () => undefined },
  );
  if (!response.ok) return EMPTY_CATALOG;
  const data = (await response.json()) as PluginCatalogResponse;
  const items = Array.isArray(data.items) ? data.items : EMPTY_CATALOG;
  return items.map((row) => toEntry(row));
};
