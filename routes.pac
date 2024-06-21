function FindProxyForURL(url, host) {
    // Log host to see if PAC file is correctly matching the domain
    // Uncomment the next line to enable logging (useful for debugging in some browsers)
    // console.log("Checking host: " + host);

    // Check if the host ends with .bmwgroup.net
    if (shExpMatch(host, "*.bmwgroup.net")) {
        // Use SOCKS proxy on localhost:9898
        return "SOCKS localhost:9898; DIRECT";
    }

    // For all other URLs, use direct connection
    return "DIRECT";
}
