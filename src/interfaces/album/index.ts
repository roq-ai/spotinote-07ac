import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface AlbumInterface {
  id?: string;
  spotify_id: string;
  grade: number;
  user_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface AlbumGetQueryInterface extends GetQueryInterface {
  id?: string;
  spotify_id?: string;
  user_id?: string;
  organization_id?: string;
}
