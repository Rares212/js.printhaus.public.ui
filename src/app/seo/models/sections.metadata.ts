export const SECTIONS_METADATA = {
    dashboard: {
        path: "",
        fragment: "welcome",
        meta: {
            title: "Dashboard",
            description: "Dashboard description",
            keywords: ["dashboard", "home", "main"]
        }
    },
    modelUpload: {
        path: "",
        fragment: "modelUpload",
        meta: {
            title: "Model Upload",
            description: "Model Upload description",
            keywords: ["model", "upload", "main"]
        }
    },
    shop: {
        path: "",
        fragment: "shop",
        meta: {
            title: "Shop",
            description: "Shop description",
            keywords: ["shop", "main"]
        }
    },
    gallery: {
        path: "",
        fragment: "gallery",
        meta: {
            title: "Gallery",
            description: "Gallery description",
            keywords: ["gallery", "main"]
        }
    },
    contact: {
        path: "",
        fragment: "contact",
        meta: {
            title: "Contact",
            description: "Contact description",
            keywords: ["contact", "main"]
        }
    },
    cart: {
        path: "cart",
        meta: {
            title: "Cart",
            description: "Cart description",
            keywords: ["cart", "main"]
        }
    },
    checkout: {
        path: "checkout",
        meta: {
            title: "Checkout",
            description: "Checkout description",
            keywords: ["checkout", "main"]
        }
    },
    signup: {

    }
}

export interface SectionData {
    path: string;
    fragment?: string;
    meta: SectionMetadata;
}

export interface SectionMetadata {
    title: string;
    description: string;
    keywords: string[];
}
