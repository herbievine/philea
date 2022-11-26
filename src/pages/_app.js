"use strict";
exports.__esModule = true;
require("../styles/globals.css");
require("@rainbow-me/rainbowkit/styles.css");
var wagmi_1 = require("wagmi");
var web3_1 = require("../lib/web3");
var rainbowkit_1 = require("@rainbow-me/rainbowkit");
var react_query_1 = require("react-query");
var queryClient = new react_query_1.QueryClient();
var App = function (_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <wagmi_1.WagmiConfig client={web3_1.wagmiClient}>
        <rainbowkit_1.RainbowKitProvider chains={web3_1.chains}>
          <Component {...pageProps}/>
        </rainbowkit_1.RainbowKitProvider>
      </wagmi_1.WagmiConfig>
    </react_query_1.QueryClientProvider>);
};
exports["default"] = App;
