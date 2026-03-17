export const transormResponse = ({ responseValue }: any) => {
  if (responseValue instanceof Response) return responseValue;

  const data = responseValue;

  return (
    data?.render || {
      status: 200,
      data: data?.data || data,
      meta: {
        message: 'success',
        ...(data?.data && data?.meta),
      },
    }
  );
};
