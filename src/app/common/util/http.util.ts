import { defer, Observable } from "rxjs";

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

export function before<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>) => defer(() => {
        callback();
        return source;
    });
}
