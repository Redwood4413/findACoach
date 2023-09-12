interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_API_KEY: string;
  readonly VITE_SUPABASE_DB_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
