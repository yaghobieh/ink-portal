export type CmsErrorDetail = {
  url?: string;
  status?: number;
  reason?: string;
  response?: string;
};

export type CmsErrorPageProps = {
  detail?: CmsErrorDetail | null;
  onRetry?: () => void;
};
