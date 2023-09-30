import http from './httpService'

const endpoint = '/user'

export async function crateUser(data){
    return await http.post(endpoint + "/createUser", data);
}

export async function authUser(data) {
  return await http.post(endpoint + "/auth", data);
}

export async function updateUser(data) {
  return await http.post(endpoint + "/updateUser", data);
}

export async function getUserById(userId) {
  return await http.get(endpoint + `/getUser/${userId}`);
}