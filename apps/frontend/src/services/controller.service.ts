import { api } from ".";

class controller {
  async dataRequest<T>(
    method: string,
    url: string,
    _data?: T,
    access_token?: string
  ) {
    let data, error;

    const response = await api.request({
      method: method.toUpperCase(),
      url,
      data: _data,
      headers: { Authorization: access_token },
    });

    if (response.status >= 400) {
      error = response.statusText;
    } else {
      data = response.data;
    }

    return { data, error };
  }
}

export { controller };
