export const STORE_PATH = "path:storePath";

export const storePath = data => {
  return {
    type: STORE_PATH,
    data
  };
};
