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
        },

        shop: {
            items: {
                get: {
                    url: 'shop/items',
                }
            },
            itemCount: {
                get: {
                    url: 'shop/item-count',
                }
            },
            modelSignedUrl: {
                get: {
                    url: 'shop/item/model-signed-url',
                }
            }
        }
    },
    auth: {
        domain: 'printhaus-dev.eu.auth0.com',
        clientId: 'NapC18pVs9ddKQf4XbVwqrHdC0bCePdp',
    }
};
