export const useGetApiRoutes = (slug?: string) => {
  const routes = {
    example: "/example",
    example2: `/example${slug}`,
  };
  return routes;
};
