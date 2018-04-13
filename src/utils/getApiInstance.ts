import { Request } from 'express';
import axios, { AxiosInstance } from 'axios';
import logger from '../server/utils/logger';

let axiosInstance: AxiosInstance | undefined;

export default (req: Request) => {
  if (!axiosInstance) {
    const baseURL = `${req.protocol}://${req.get('host')}/api`;
    logger.info('Creating axios instance with url', baseURL);
    axiosInstance = axios.create({
      baseURL: `${req.protocol}://${req.get('host')}/api`,
    });
  }

  return axiosInstance;
};
