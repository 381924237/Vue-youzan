import axios from 'axios'

export default function fetch(url,data){
  return new Promise((resolve,reject) => {
    axios.post(url,data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
