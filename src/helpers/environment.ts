export const getEnvVariable = (key: string) => {
  const value = import.meta.env[key];

  if (value === undefined) throw new Error(`Env variable ${key} is required`);

  return value;
};
