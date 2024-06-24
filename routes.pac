function FindProxyForURL(url, host) {
    // Define the SOCKS proxy
    var proxy = "SOCKS5 localhost:9898";

    // Define whitelist and blacklist patterns
    var whitelist = [
        "*.cloud.bmw",
        "*.bmwgroup.net",
        "*.muc"
    ];

    var blacklist = [
        "strongauth.bmwgroup.net"
    ];

    // Check if host matches any pattern in the blacklist
    for (var i = 0; i < blacklist.length; i++) {
        if (shExpMatch(host, blacklist[i])) {
            return "DIRECT"; // Skip proxy if the host is in the blacklist
        }
    }

    // Check if host matches any pattern in the whitelist
    for (var i = 0; i < whitelist.length; i++) {
        if (shExpMatch(host, whitelist[i])) {
            return proxy; // Use proxy if the host is in the whitelist
        }
    }

    // Default to direct connection if no matches are found
    return "DIRECT";
}
