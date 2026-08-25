export type VersionDockerInfo = {
  running: boolean;
  hostname: string;
  image: string;
  containerName: string;
};

export type VersionBuildInfo = {
  sha: string;
  time: string;
  number: string;
};

export type VersionInfo = {
  product: string;
  version: string;
  ink: string;
  portal: string;
  node: string;
  platform: string;
  arch: string;
  env: string;
  uptimeSec: number;
  docker: VersionDockerInfo;
  build: VersionBuildInfo;
};
