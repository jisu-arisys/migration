import axios from 'axios'

const VDN_API_URL = 'http://localhost:8080/api/v1'

class VdnDataService {

    retrieveAllVdns() {
        return axios.get(`${VDN_API_URL}/vdns`);
    }

    retrieveVdn(id) {
        return axios.get(`${VDN_API_URL}/vdns/${id}`);
    }

    deleteVdn(id) {
        return axios.delete(`${VDN_API_URL}/vdns/${id}`);
    }

    updateVdn(id, vdn) {
        return axios.put(`${VDN_API_URL}/vdns/${id}`, vdn);
    }
    createVdn(vdn) {
        return axios.post(`${VDN_API_URL}/vdns`, vdn);
    }
  }
export default new VdnDataService()