const request = require('request');
const apiOptions = {
    server: 'https://localhost:3000';
};

// if(process.env.NODE_ENV === 'production') {
//     apiOptions.server = 'https://sadasd.herokuapp.com';
// }

const requestOptions = {
    url: 'https://data.gov.in/resources/9ef84268-d588-465a-a308-a864a43d0070',
    method: 'GET',
    json: {},
    qs: {
        offset: 20
    }
};

request(requestOptions, (err, res, body) => {
    if(err)
        console.log(err);
    else if(res.statusCode === 200)
        console.log(body);
    else
        console.log(res.statusCode);
});