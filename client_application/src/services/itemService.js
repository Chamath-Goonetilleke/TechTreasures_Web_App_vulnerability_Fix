import http from "./httpService";

const endpoint = "/item";

export async function createItem(data) {
  return await http.post(endpoint + "/insertItem", data);
}

export async function getAllItems(){
  return await http.get(endpoint + "/getAllItems");
}

export async function deleteItem(itemId){
  return await http.get(endpoint + `/deleteItem/${itemId}`);
}

export async function getItemById(id) {
  console.log("............")
  return await http.get(endpoint + `/getItem/${id}`);
}