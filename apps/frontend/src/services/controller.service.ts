import { api } from ".";

const controller = {
  async get(url: string, access_token?: string) {
    return await api
      .get(url, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        return { data: response.data, error: false };
      })
      .catch((error) => {
        return { data: null, error: error.response.data.message };
      });
  },
  async post(url: string, _data: unknown, access_token?: string) {
    return await api
      .post(url, _data, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        return { data: response.data, error: false };
      })
      .catch((error) => {
        return { data: null, error: error.response.data.message };
      });
  },
  async patch(url: string, _data: unknown, access_token?: string) {
    return await api
      .patch(url, _data, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        return { data: response.data, error: false };
      })
      .catch((error) => {
        return { data: null, error: error.response.data.message };
      });
  },
  async delete(url: string, access_token?: string) {
    return await api
      .delete(url, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        return { data: response.data, error: false };
      })
      .catch((error) => {
        return { data: null, error: error.response.data.message };
      });
  },
};

export { controller };
