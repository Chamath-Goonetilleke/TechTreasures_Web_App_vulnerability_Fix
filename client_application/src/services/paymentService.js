import http from "./httpService";

const endpoint = "/payment";

export async function createPayment(data){
    return await http.post(endpoint + `/create-payment`, data);
}