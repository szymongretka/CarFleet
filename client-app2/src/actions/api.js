import axios from "axios";

const baseUrl = "http://localhost:5000/"



export default {

    car(url = baseUrl + 'car/') {
        return {
            fetchAll: () => axios.get(baseUrl + 'cars'),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}