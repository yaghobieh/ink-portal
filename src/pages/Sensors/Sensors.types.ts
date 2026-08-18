export type SensorsDbDriver = 'postgres' | 'mongo' | null;

export type SensorsDbTable = {
  name: string;
  rowCount: number;
  columns: string[];
};

export type SensorsInstallConfig = {
  projectName?: string;
  mediaStorage?: string;
  mcp?: { enabled?: boolean };
  configPath?: string;
  envPath?: string;
};

export type SensorsInstallStatus = {
  installed: boolean;
  live: boolean;
  dbDriver: SensorsDbDriver;
  dbHost: string;
  error?: string;
  config?: SensorsInstallConfig | null;
  tables?: SensorsDbTable[];
  mcpTools?: string[];
};

export type SensorsProps = {
  embedded?: boolean;
};
