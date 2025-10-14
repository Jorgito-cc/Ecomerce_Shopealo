export const getBitacoraLogs = async (password: string) => {
  const response = await fetch(
    `https://backend-ecommerce-production-0ef1.up.railway.app/api/v1/bitacora?password=${password}`,
    { method: "GET" }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
  }

  return response.json();
};
