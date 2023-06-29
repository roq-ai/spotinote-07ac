import axios from 'axios';
import queryString from 'query-string';
import { AlbumInterface, AlbumGetQueryInterface } from 'interfaces/album';
import { GetQueryInterface } from '../../interfaces';

export const getAlbums = async (query?: AlbumGetQueryInterface) => {
  const response = await axios.get(`/api/albums${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAlbum = async (album: AlbumInterface) => {
  const response = await axios.post('/api/albums', album);
  return response.data;
};

export const updateAlbumById = async (id: string, album: AlbumInterface) => {
  const response = await axios.put(`/api/albums/${id}`, album);
  return response.data;
};

export const getAlbumById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/albums/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAlbumById = async (id: string) => {
  const response = await axios.delete(`/api/albums/${id}`);
  return response.data;
};
