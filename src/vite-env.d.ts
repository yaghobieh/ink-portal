/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PAYMENT_LINK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
