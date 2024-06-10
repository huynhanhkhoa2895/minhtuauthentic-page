export const handleDataFetch = (data: any) => {
  if (data.statusCode !== 200 && data.statusCode !== 201) {
    throw new Error(data.statusCode);
  }
  return data;
};
