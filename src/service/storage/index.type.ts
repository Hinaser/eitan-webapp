export interface File {
  path: string;
  contentType: string | null;
  data?: string | Blob;
}

export type IStorage = {
  list: (path?: string, recursive?: boolean) => Promise<File[]>;
  download: (path: string) => Promise<File|null>;
  upload: (file: File) => Promise<boolean>;
  remove: (path: string) => Promise<void>;
};
