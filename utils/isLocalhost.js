export function isLocalhost(req) {
    return req.headers.host?.includes('localhost');
}