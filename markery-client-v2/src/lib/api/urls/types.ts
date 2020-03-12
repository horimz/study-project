// Url type
export interface Url {
  id?: string;
  url: string;
  alias: string;
  description?: string;
}

// Input types
export interface CreateUrlInput {
  url: string;
  alias: string;
  description?: string;
}

export interface UpdateUrlInput {
  url?: string;
  alias?: string;
  description?: string;
}

// Response types
export interface GetUrlsInFolderByIdResponse {
  transactionTime: Date;
  content: {
    urls: Url[];
  };
}

export interface CreateUrlResponse {
  transactionTime: Date;
  content: Url;
}

export interface UpdateUrlResponse {
  transactionTime: Date;
  content: {};
}

export interface DeleteUrlResponse {
  transactionTime: Date;
  content: {};
}
