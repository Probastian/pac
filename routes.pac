var rules = {
	// BMW-Proxy Rules
    "SOCKS localhost:9898": {
        whitelist: [
            { pattern: "*.cloud.bmw", matchType: "host", isRegex: false },
            { pattern: "*.bmwgroup.net", matchType: "host", isRegex: false },
            { pattern: "*.muc", matchType: "host", isRegex: false },
        ],
        blacklist: [
			{ pattern: "strongauth.bmwgroup.net", matchType: "host", isRegex: false }
		]
    }
};

function FindProxyForURL(url, host) {
    // Function to check if the host or URL matches the pattern
    function matchesPattern(host, url, rule) {
        for (var i = 0; i < rule.length; i++) {
            var entry = rule[i];
            var pattern = entry.pattern;
            var matchType = entry.matchType;

            if (entry.isRegex) {
                var regex = new RegExp(pattern);
                if ((matchType === "host" && regex.test(host)) || 
                    (matchType === "url" && regex.test(url))) {
                    return true;
                }
            } else {
                if ((matchType === "host" && shExpMatch(host, pattern)) || 
                    (matchType === "url" && shExpMatch(url, pattern))) {
                    return true;
                }
            }
        }
        return false;
    }

    // Check the rules for each return value
    for (var returnValue in rules) {
        if (rules.hasOwnProperty(returnValue)) {
            var ruleSet = rules[returnValue];

            // First check the blacklist (higher priority)
            if (ruleSet.blacklist && matchesPattern(host, url, ruleSet.blacklist)) {
                continue; // Skip to the next rule set if a blacklist match is found
            }

            // Then check the whitelist
            if (ruleSet.whitelist && matchesPattern(host, url, ruleSet.whitelist)) {
                return returnValue;
            }
        }
    }

    // Default to direct connection if no rules matched
    return "DIRECT";
}
