const API_KEY = 'c93f24544e92fd5a5a954223';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export const getMonedas = async () => {
  const response = await fetch(`${BASE_URL}/latest/USD`);
  const data = await response.json();

  if (data.result === 'success') {
    return Object.keys(data.conversion_rates);
  }

  throw new Error('Error al obtener monedas');
};

export const convertirMoneda = async (from, to, amount) => {
  const response = await fetch(`${BASE_URL}/latest/USD`);
  const data = await response.json();

  if (data.result === 'success') {
    const rates = data.conversion_rates;
    const amountInUSD = amount / rates[from];
    const convertedAmount = amountInUSD * rates[to];
    return convertedAmount;
  }

  throw new Error('Error al convertir');
};
