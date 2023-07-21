export interface ResourceItems {
  asset_id: string;
  public_id: string;
  format: 'jpg' | 'png' | 'gif';
  version: number;
  resource_type: 'image' | 'raw' | 'video' | 'auto';
  type: 'upload' | 'private' | 'authenticated';
  created_at: Date;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  access_mode: 'public' | 'authenticated' | 'private';
  url: string;
  secure_url: string;
  tags?: [];
}

export interface CloudinaryResponse {
  resources: ResourceItems[];
}
