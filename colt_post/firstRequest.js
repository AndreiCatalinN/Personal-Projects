const request = require("request");
let url = 'https://jsonplaceholder.typicode.com/users';
request(url, (err, response, body) => {
    if(err) {
        console.log("Something went wrong");
        console.log(err);
    } else if(response.statusCode == 200){
        const data = JSON.parse(body);
        // console.log(data);

        data.forEach( (person) => {console.log(person.name)});
    }
});
