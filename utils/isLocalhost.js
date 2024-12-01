export function isLocalhost(req) {
    const isLocalhostHost = req.headers.host?.includes('localhost');

    const isLocalhostIP =
        req.socket.remoteAddress === '127.0.0.1' ||
        req.socket.remoteAddress === '::1';

    const isLocalNetwork = req.headers.host?.startsWith('192.168.') ||
        req.headers.host?.startsWith('10.');

    return isLocalhostHost || isLocalhostIP || isLocalNetwork;
}