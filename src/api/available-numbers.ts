export type AvailableNumbersResponse = {
  numbers: string[];
};

export const fetchAvailableNumbers = async () => {
  const response = await fetch('/available-numbers', {
    method: 'POST',
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !Array.isArray(data.numbers)) {
    throw new Error('Unable to load numbers');
  }
  return data as AvailableNumbersResponse;
};
