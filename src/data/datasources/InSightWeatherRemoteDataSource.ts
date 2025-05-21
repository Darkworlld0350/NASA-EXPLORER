import { nasaApi } from '../../core/api/nasaApi';

export const getInSightWeatherRaw = async (): Promise<any> => {
  const res = await nasaApi.get('/insight_weather/', {
    params: {
      feedtype: 'json',
      ver: '1.0',
    },
  });
  return res.data;
};
