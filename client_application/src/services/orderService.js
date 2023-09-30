import http from "./httpService";

const endpoint = "/order";

export async function getAllOrders(){
    return await http.get(endpoint+"/getAllOrders")
}

export async function completeOrderById(orderId){
    return await http.post(endpoint + `/completeOrder/${orderId}`);
}
export async function createOrder(data){
    return await http.post(endpoint + `/createOrder`, data);
}