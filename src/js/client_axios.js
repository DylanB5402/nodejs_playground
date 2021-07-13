import axios from 'axios';

axios.get("http://localhost:3000").then( (response) => {
    console.log(response.data)
})

axios.post("http://localhost:3000", { 'option' : 'one'}).then( (response) => {
    console.log(response.data)
})

axios.post("http://localhost:3000", { 'option' : 'two'}).then( (response) => {
    console.log(response.data)
})

axios.post("http://localhost:3000", { 'option' : 'three'}).then( (response) => {
    console.log(response.data)
})