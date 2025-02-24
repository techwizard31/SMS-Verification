const sdk = require('node-appwrite');

// Init SDK
const client = new sdk.Client();

const databases = new sdk.Databases(client);

client
    .setEndpoint(process.env.NEXT_PROJECT_ENDPOINT) // Your API Endpoint
    .setProject(process.env.NEXT_PROJECT_ID) // Your project ID
    .setKey(process.env.NEXT_PROJECT_APIKEY) // Your secret API key
;

const promise = databases.create('<DATABASE_ID>', '[NAME]');

promise.then(function (Response: any) {
    console.log(Response);
}, function (error: any) {
    console.log(error);
});
