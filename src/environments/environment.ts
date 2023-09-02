export const environment = {
    printhausApi: {
        rootUrl: 'http://localhost:3000/printnuts-api',
        apiVersion: 'v1',

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
    }
};
