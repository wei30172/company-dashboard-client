class ResponseError extends Error {
  response?: Response;
}

const getError = (err: ResponseError) => {
  return err.response ? err.message : "error";
};

export default getError;
