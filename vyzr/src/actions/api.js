import axios from 'axios';
export function postFunctionWithAuthToken(url, body, authToken) {
  return axios.post(url, body,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Token token=" + authToken
      }
    }
  )
    .then((response) => { return response })
    .catch((error) => {
      return error.response
    });
}

export function postFunction(url, body) {
  return axios.post(
    url,
    body,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error.response
    });
}

export function getFunction(url) {
  return axios.get(url)
    .then((response) => { return response })
    .catch((error) => {
      return error.response
    });
}


export function getFunctionWithAuthToken(url, authToken) {
  return axios.get(
    url,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Token token=" + authToken
      }
    }
  )
    .then((response) => { return response })
    .catch((error) => {
      return error.response
    });
}

export function putFunctionWithAuthToken(url, body, authToken) {
  return axios.put(
    url,
    body,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Token token=" + authToken
      },
    }
  )
    .then((response) => { return response })
    .catch((error) => {
      return error.response
    });
}

export function deleteFunctionWithAuthToken(url, authToken) {
  return axios.delete(
    url,
    {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Token token=" + authToken
      }
    }
  )
    .then((response) => { return response })
    .catch((error) => {
      return error.response
    });
}
