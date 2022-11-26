"use strict";
exports.__esModule = true;
exports.useAppStateStore = void 0;
var zustand_1 = require("zustand");
var z = require("zod");
var middleware_1 = require("zustand/middleware");
var useAppStateStore = (0, zustand_1["default"])()((0, middleware_1.devtools)(function (set) { return ({
    loading: false,
    setLoading: function (state) {
        try {
            z.boolean().parse(state);
            set({ loading: state });
        }
        catch (error) {
            set({
                error: {
                    key: "unknown",
                    msg: "Invalid state"
                }
            });
        }
    },
    error: null,
    setError: function (state) {
        set({ error: state });
    }
}); }));
exports.useAppStateStore = useAppStateStore;
