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
    }
};
