export function buildUrlPath(root: string, apiVersion: string | null, path: string): string {
    let url = '';

    if (root && root !== '') {
        url = root;
    }

    if (apiVersion || apiVersion !== "") {
        url += `/${apiVersion}`;
    }

    return url + `/${path}`;
}
