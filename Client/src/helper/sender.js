import axios from 'axios';
import Swal from 'sweetalert2';

const helper = {
  sender: (objTraining) => {
    axios.post(process.env.URL_LOCAL + 'business/add', objTraining)

      .then((response) => {
        if (response.data.status == 'true') {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          setTimeout(() => location.reload(), 1000);
        }
        else {
          Swal.fire({
            position: 'top-end',
            type: 'error',
            title: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        });
      })
    // console.log(objTraining);
    //location.reload()
  },

  sendMessage(objmessage) {
    return axios.post(process.env.URL_LOCAL + 'business/send', objmessage)
      .then((res) => res.data)
      .catch(() => console.log("error"));
  },
  recieveMessage(question) {
    return axios.post(process.env.URL_LOCAL + 'business/getEntity', question)
      .then(res => res.data)
      .catch((err) => console.log(err));
  },

  recieveAnswer(obj) {
    return axios.post(process.env.URL_LOCAL + 'business/getAnswer', obj)
      .then(res => res.data)
      .catch(err => console.log(rr))
  },

  getData() {
    // console.log("a");
    return axios.get(process.env.URL_LOCAL + 'business/')
      .then(response => response.data)
  },

  deleteEntity(id) {
    return axios.delete(process.env.URL_LOCAL + 'business/deleteEntity', { data: id })
      .then(response => response.data)
      .catch(err => console(err));
  },
  deleteIntent(id) {
    return axios.delete(process.env.URL_LOCAL + 'business/deleteIntent', { data: id })
      .then(response => response.data)
      .catch(err => console(err));
  },

  addEntity(id) {
    return axios.post(process.env.URL_LOCAL + 'business/createEntity', id)
      .then(response => response.data)
  },

  createIntent(intent) {
    return axios.post(process.env.URL_LOCAL + 'business/createIntent', intent)
      // return axios.post('http://192.168.137.1:4000/business/createIntent',intent)
      .then(response => response.data)
  },

  async getSamples() {
    console.log('sample');
    return await axios.get(process.env.URL_LOCAL + 'business/samples')
      .then(response => response.data);
  },

  async deleteSamples(samples) {
    return await axios.delete(process.env.URL_LOCAL + 'business/deleteSamples', { data: samples })
      .then(response => response.data);
  }
}

export default helper;