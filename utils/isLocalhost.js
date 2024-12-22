export function isLocalhost(req) {
    const isLocalhostHost = req.headers.host?.includes('localhost');

    const isLocalhostIP =
        req.socket.remoteAddress === '127.0.0.1' ||
        req.socket.remoteAddress === '::1';

    return isLocalhostHost || isLocalhostIP;
}