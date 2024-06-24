rules = {
    // BMW-Proxy Rules
    "SOCKS5 localhost:9898": {
        whitelist: [
            { pattern: "*.cloud.bmw", matchType: "host", isRegex: false },
            { pattern: "*.bmwgroup.net", matchType: "host", isRegex: false },
            { pattern: "*.muc", matchType: "host", isRegex: false }
        ],
        blacklist: [
            { pattern: "strongauth.bmwgroup.net", matchType: "host", isRegex: false }
        ]
    }
};

function FindProxyForURL(url, host) {
    // Function to check if a host or URL matches a pattern
    function matchesPattern(host, url, entry) {
        pattern = entry.pattern;
        matchType = entry.matchType;

        if (entry.isRegex) {
            regex = new RegExp(pattern);
            return (matchType === "host" && regex.test(host)) ||
                   (matchType === "url" && regex.test(url));
        } else {
            adjustedPattern = pattern.replace(/\./g, "\\.").replace(/\*/g, ".*");
            regex = new RegExp("^" + adjustedPattern + "$");
            return (matchType === "host" && regex.test(host)) ||
                   (matchType === "url" && regex.test(url));
        }
    }

    // Iterate over each rule set
    for (var returnValue in rules) {
        if (Object.prototype.hasOwnProperty.call(rules, returnValue)) {
            ruleSet = rules[returnValue];

            // Check blacklist first (higher priority)
            if (ruleSet.blacklist) {
                for (var i = 0; i < ruleSet.blacklist.length; i++) {
                    if (matchesPattern(host, url, ruleSet.blacklist[i])) {
                        continue; // Skip to the next rule set if a blacklist match is found
                    }
                }
            }

            // Check whitelist
            if (ruleSet.whitelist) {
                for (var j = 0; j < ruleSet.whitelist.length; j++) {
                    if (matchesPattern(host, url, ruleSet.whitelist[j])) {
                        return returnValue;
                    }
                }
            }
        }
    }

    // Default to direct connection if no rules matched
    return "DIRECT";
}
