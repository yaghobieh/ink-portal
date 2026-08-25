import { useEffect, useState, type FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import { Badge, Button, Card, Flex, Spinner, Typography } from '@forgedevstack/bear';
import { useI18n } from '@i18n/index';
import { INK_API_URL, ROUTES } from '@const/index';
import type { SensorsInstallStatus, SensorsProps } from './Sensors.types';

const emptyStatus = (error: string): SensorsInstallStatus => ({
  installed: false,
  live: false,
  dbDriver: null,
  dbHost: '',
  tables: [],
  mcpTools: [],
  error,
});

export const SensorsView: FC<SensorsProps> = (props) => {
  const { embedded = false } = props;
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<SensorsInstallStatus | null>(null);

  const engineLabel = (driver: SensorsInstallStatus['dbDriver']): string => {
    if (driver === 'postgres') return t.sensors.enginePostgres;
    if (driver === 'mongo') return t.sensors.engineMongo;
    return t.sensors.engineUnknown;
  };

  const load = () => {
    setLoading(true);
    const base = INK_API_URL || '';
    void fetch(`${base}/api/install/status`)
      .then(async (response) => {
        if (!response.ok) throw new Error(t.sensors.unreachable);
        return (await response.json()) as SensorsInstallStatus;
      })
      .then((data) =>
        setStatus({
          installed: data.installed,
          live: data.live,
          dbDriver: data.dbDriver ?? null,
          dbHost: data.dbHost || '',
          error: data.error,
          config: data.config,
          tables: data.tables ?? [],
          mcpTools: data.mcpTools ?? [],
        }),
      )
      .catch(() => setStatus(emptyStatus(t.sensors.unreachable)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Flex
      direction="column"
      gap={4}
      className={embedded ? 'fade-in' : 'fade-in ink-sensors max-w-3xl mx-auto px-4 py-8'}
    >
      <Typography variant="h2" className="mb-0">
        {t.sensors.title}
      </Typography>
      <Typography variant="body1" className="ink-text-muted mb-0">
        {t.sensors.description}
      </Typography>
      {loading ? (
        <Flex align="center" gap={2}>
          <Spinner size="sm" />
          <Typography variant="body2" className="mb-0">
            {t.sensors.checking}
          </Typography>
        </Flex>
      ) : null}
      <Card className="p-4">
        <Flex direction="column" gap={3}>
          <Flex align="center" gap={2} className="flex-wrap">
            <Typography variant="h4" className="mb-0">
              {t.sensors.status}
            </Typography>
            <Badge variant={status?.live ? 'success' : 'warning'}>
              {status?.live ? t.sensors.connected : t.sensors.down}
            </Badge>
          </Flex>
          <Typography variant="body2" className="mb-0">
            {t.sensors.engine}: {engineLabel(status?.dbDriver ?? null)}
          </Typography>
          {status?.dbHost ? (
            <Typography variant="body2" className="mb-0">
              {t.sensors.host}: {status.dbHost}
            </Typography>
          ) : null}
          <Typography variant="body2" className="mb-0">
            {t.sensors.installed}:{' '}
            {status?.installed ? t.sensors.yes : t.sensors.no}
          </Typography>
          {status?.config?.projectName ? (
            <Typography variant="body2" className="mb-0">
              {t.sensors.project}: {status.config.projectName}
            </Typography>
          ) : null}
          {status?.config?.mediaStorage ? (
            <Typography variant="body2" className="mb-0">
              {t.sensors.media}: {status.config.mediaStorage}
            </Typography>
          ) : null}
          {status?.config?.mcp ? (
            <Typography variant="body2" className="mb-0">
              {t.sensors.mcp}:{' '}
              {status.config.mcp.enabled ? t.sensors.yes : t.sensors.no}
            </Typography>
          ) : null}
          {status?.mcpTools && status.mcpTools.length > 0 ? (
            <div>
              <Typography variant="h5" className="mb-2">
                {t.sensors.mcpTools}
              </Typography>
              <Typography variant="caption" className="mb-0">
                {status.mcpTools.join(', ')}
              </Typography>
            </div>
          ) : null}
          <div>
            <Typography variant="h5" className="mb-2">
              {t.sensors.tables}
            </Typography>
            {status?.tables && status.tables.length > 0 ? (
              <Flex direction="column" gap={2}>
                {status.tables.map((table) => (
                  <div key={table.name} className="ink-cms-db-table">
                    <Typography variant="body2" className="mb-0">
                      {t.sensors.tableName}: {table.name}
                    </Typography>
                    <Typography variant="caption" className="mb-0">
                      {t.sensors.tableRows}: {table.rowCount}
                    </Typography>
                    <Typography variant="caption" className="ink-cms-db-table__cols mb-0">
                      {t.sensors.tableColumns}: {table.columns.join(', ')}
                    </Typography>
                  </div>
                ))}
              </Flex>
            ) : (
              <Typography variant="caption" className="ink-cms__muted mb-0">
                {t.sensors.tablesEmpty}
              </Typography>
            )}
          </div>
          {status?.error ? (
            <Typography variant="body2" className="text-red-500 mb-0">
              {status.error}
            </Typography>
          ) : null}
          {!status?.installed ? (
            <Typography variant="body2" className="ink-text-muted mb-0">
              {t.sensors.runInstallment}
            </Typography>
          ) : null}
          <Flex gap={2} className="flex-wrap">
            <Button size="sm" variant="ink" onClick={load}>
              {t.sensors.refresh}
            </Button>
            {embedded ? null : (
              <Link to={ROUTES.CMS} className="ink-doc-link">
                <Button size="sm" variant="outline">
                  {t.sensors.openCms}
                </Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export const Sensors: FC = () => <SensorsView />;
