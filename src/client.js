const grpc = require('grpc');
const path = require('path');

const AuthorsDefinition = grpc.load(path.resolve(__dirname, '../proto/authors.proto'));

const authorClient = new AuthorsDefinition.AuthorService('localhost:50051', grpc.credentials.createInsecure());

function promisify(method) {
    return (params) => {
        return new Promise((resolve, reject) => {
            authorClient[method](params, (err, response) => {
                if (err) return reject(err);
                return resolve(response);
            });
        });
    }
}

// IIFE (Immediately Invoked Function Expression)
; (async () => {
    const Leo = await promisify('create')({name: 'Leonardo T. Fernandes', website: 'https://leofernandes.dev'});
    console.log(Leo);
})()