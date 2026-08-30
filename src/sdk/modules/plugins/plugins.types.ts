export type PluginApiRow = {
  id: string;
  slug?: string;
  name: string;
  packageName: string;
  npmUrl: string;
  gitUrl: string;
  description: string;
};

export type PluginCatalogResponse = {
  items: PluginApiRow[];
};
