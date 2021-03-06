export const fetchLogger = () => {
  // To see all the requests in the chrome Dev tools in the network tab.
  XMLHttpRequest = GLOBAL.originalXMLHttpRequest
    ? GLOBAL.originalXMLHttpRequest
    : GLOBAL.XMLHttpRequest;

  // Fetch logger
  global._fetch = fetch;
  global.fetch = function(uri, options, ...args) {
    return global._fetch(uri, options, ...args).then(response => {
      if (__DEV__) console.log("fetchLogger.js - fetchLogger", {request: {uri, options, ...args}, response});
      return response;
    });
  };
};
