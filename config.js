const path = require("path");

const config = {
    server: {
        port: 8130
    },

    theme: {
        theme: "elegance",
        version: "1.0"
    },

    auth: {
        callbackHost: "http://127.0.0.1:8130",
        strategies: {
            oauth2: {
                clientID: "dummy-client-id",
                clientSecret: "dummy-client-secret",
                authorizationURL: "http://127.0.0.1:8282/o/oauth2/v2/auth",
                tokenURL: "http://127.0.0.1:8282/oauth2/v4/token"
            },
            /*
            facebook: {
            },
            twitter: {
            },
            google: {
                authParam: { scope: ['profile'] }
            },
            github: {
                clientID: "46b3d33486930db2dace",
                clientSecret: "cf9536156e676f883c6904f484cd0eac92a1e138"
            },
            amazon: {
                clientID: "amzn1.application-oa2-client.1dc313a406e24beea7a34a7db0c290b9",
                clientSecret: "f5ffa88f7d0e8c1525456dc6cd433a5aa6987f377b933a6fb0f825a2b480dad1"
            }*/
        }
    }
};

module.exports = config;