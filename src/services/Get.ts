import axios from "axios";

const Get = (limit = 20) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`)
        .then((result) => {
            resolve(result.data);
        },(err) => {
            reject(err);
        })
    })
    return promise;
}

export default Get;