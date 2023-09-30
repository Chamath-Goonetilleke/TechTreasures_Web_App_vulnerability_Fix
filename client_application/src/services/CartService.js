import http from "./httpService";

const endpoint = "/cart";

export async function getCartByUserId(id) {
  return await http.get(endpoint + `/getCart/${id}`);
}
export async function createCart(data){
  return await http.post(endpoint + `/insertCart`, data);
}
