export const environment = {
    printhausApi: {
        rootUrl: 'printhaus-api',
        apiVersion: '',

        print: {
            materials: {
                get: {
                    url: 'print/materials',
                }
            },
            modelDetails: {
                get: {
                    url: 'print/model-details',
                }
            }
        }
    },
    auth: {
        domain: 'printhaus-dev.eu.auth0.com',
        clientId: 'NapC18pVs9ddKQf4XbVwqrHdC0bCePdp',
    }
};
