const axios = require('axios');
const OAuthClient = require('client-oauth2')
var cron = require('node-cron');


// Create New invoice
const QUICKBOOKS_BASE_URL = "sandbox-quickbooks.api.intuit.com";
const MINOR_VERSION = "56";
const COMPANY_ID = "4620816365166010070";
let REFRESH_TOKEN = "AB11625903924iru6f5aME1MHNcvfg3eRJBT9Ew0MSbADDE58S"
let ACCESS_TOKEN = "eeyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..mglK3SSsGTW8mmr_VJJz_g.dmNqz5RpfftFtJBkUujwNKuO8pA1MR_droJNBQ4jTogEOjYzME5Dj8RQZZrW-nCwgjzU6v6c-BiRWJicAkOcd0rW249VH14hQOnjcRqwHSj-7Wkqfi3wZOHvrZ5HWlOcAia5uXdw85fTsrq5ka4rm06mYTjlTh9j3Y1wlXby00Xg7rajkjV4VwGwp8SsRqOyZr83FO7O-yvmPTgYWtJaS0Xw2qw8xGCejcvOAa_OQFQB8r2hEI2xUnx2cMf05mrwQ59ahk3cT810f5lDNkNK2LZ9WeCCuLalZq1F4piM4ixLmPAbvVfkOkx8rzRZz-LX01bBsEaqou9TtXaTWZcCyaVxLsjif4xLLVj-eE-uMc6oeTJCUDk6_C3faizOGYSDvjnEjB19W86BzQ7jrjkAZRoX3JvrdJttyqU9TN7p0u0wjKprj8gpHzPG5ldpVrt5omY2fxvLtCTBCCWjHIGMSyhw0jNST1j8OUGbB-ZDainqBeFYXF8JvTtVfmIgXRjVzXWOybE9JbF1O1uCtipPiEub7wqRbFBeT43poPCpxU8u1IpDxgq_GLZW3DzmUREtbs_eDgf-J2fZEyXiBwfG2AcI8JyzqdKazx06zG03gcqCqj1eAb4BQY4-i8iGKdYlYE8vYEp7bkIiZN5gRnguy31OYUL5jMkHKprzS0vpsCaoJzAYWpYOktLOSoD7XRuLnpwTkdaMil4__FXcdC_JQKvOq4w6XpLuaAIO2PiIc2kF73_gwnwxXfwagP9iayrF.o7vzfr-BPa-Y7b4l149LSA"
const CLIENT_ID = "ABHajHnyJJDVljZ5f4ULphHky8Z5nq2p4mothMoQlZaDIVpg60"
const CLIENT_SECRET = "8kuCbsADVWD6oSyaqQKvW5OXTbuNWVznUBprp1ZB"

//Update token every 58th min
// cron.schedule('*/1 * * * *', () => {
//   axios.get(
//     "https://developer.api.intuit.com/.well-known/openid_sandbox_configuration/",
//     {
//       headers: {
//         'Accept': 'application/json'
//       }
//     })
//     .then(async (result) => {
//       let authConfig = {
//         clientId: CLIENT_ID,
//         clientSecret: CLIENT_SECRET,
//         redirectUri: "https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl"
//       }
//       const json = result.data
//       authConfig.authorizationUri = json.authorization_endpoint
//       authConfig.accessTokenUri = json.token_endpoint

//       intuitAuth = new OAuthClient(authConfig)
//       const token = await intuitAuth.createToken(
//         ACCESS_TOKEN, REFRESH_TOKEN,
//         // session.tokenType, session.data
//       )
//       token.refresh()
//         .then(function ({ data }) {
//           REFRESH_TOKEN = data.refresh_token
//           ACCESS_TOKEN = data.access_token
//           console.log({ REFRESH_TOKEN, ACCESS_TOKEN })
//         })
//     })
// });

// Instance of client
// var oauthClient = new OAuthClient({
//   clientId: CLIENT_ID,
//   clientSecret: CLIENT_SECRET,
//   environment: 'sandbox',                                // ‘sandbox’ or ‘production’
//   redirectUri: 'https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl'
// });

// AuthorizationUri
// var authUri = oauthClient.authorizeUri({
//   scope: [
//     OAuthClient.scopes.Accounting,
//   ],
//   state: 'intuit-test'
// });
// console.log({ authUri })

// oauthClient
//   .createToken(authUri)
//   .then(function (authResponse) {
//     oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
//     console.log({ oauth2_token_json })
//   })
//   .catch(function (e) {
//     console.log(e)
//     console.error(e);
//   });


//res.send('');
// oauthClient.refresh()
// .then(function(authResponse) {
//     console.log('Tokens refreshed : ' + JSON.stringify(authResponse.json()));
// })
// .catch(function(e) {
//   console.log(e)
//     console.error("The error message is :"+e.originalMessage);
//     console.error(e.intuit_tid);
// });
// can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}

exports.createInovice = (req, res) => {

  axios.post(`https://${QUICKBOOKS_BASE_URL}/v3/company/${COMPANY_ID}/invoice?minorversion=${MINOR_VERSION}`,
    req.body,
    {
      headers: {
        //"Host": "quickbooks.api.intuit.com",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        //"Host": "quickbooks.api.intuit.com"
      }
    }
  )
    //console.log(result)
    .then(data => {
      console.log({ data })
      res.status(200).json({ status: true, message: "Invoice createc", data: data.data })
    }).catch(error => {
      console.log(error.Fault)
      res.status(500).json({ status: false, message: error, data: error.Fault })

    })
}

exports.createCustomer = (req, res) => {
  axios.post(`https://${QUICKBOOKS_BASE_URL}/v3/company/${COMPANY_ID}/customer?minorversion=${MINOR_VERSION}`,
    req.body,
    {
      headers: {
        //"Host": "quickbooks.api.intuit.com",
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        //"Host": "quickbooks.api.intuit.com"
      }
    }
  )
    //console.log(result)
    .then(data => {
      console.log({ data })
      res.status(200).json({ status: true, message: "Customer created", data: data.data })
    }).catch(error => {
      console.log(error)
      res.status(500).json({ status: false, message: error.Fault })

    })
}