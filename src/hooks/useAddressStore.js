"use strict";
exports.__esModule = true;
exports.useAddressStore = void 0;
var zustand_1 = require("zustand");
var z = require("zod");
var middleware_1 = require("zustand/middleware");
var useAppStateStore_1 = require("./useAppStateStore");
var useAddressStore = (0, zustand_1["default"])()((0, middleware_1.devtools)(function (set) { return ({
    address: "",
    setAddress: function (address) {
        if (z
            .string()
            .regex(/^0x[0-9a-fA-F]{40}$/)
            .safeParse(address).success) {
            useAppStateStore_1.useAppStateStore.getState().setError(null);
            set({ address: address });
        }
        else {
            useAppStateStore_1.useAppStateStore.getState().setError({
                key: "address",
                msg: "Invalid address"
            });
        }
    }
}); }));
exports.useAddressStore = useAddressStore;
