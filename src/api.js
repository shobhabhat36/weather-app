const weatherApiBaseUrl = 'https://www.metaweather.com';

export const fetchIconUrl = (weatherIconAbbr) => `${weatherApiBaseUrl}/static/img/weather/${weatherIconAbbr}.svg`;