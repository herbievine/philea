"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var Chevron = function (_a) {
    var props = __rest(_a, []);
    return (<svg fill="none" height={7} width={14} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.75 1.54 8.516 5.004a2 2 0 0 1-2.532 0L1.75 1.54" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} xmlns="http://www.w3.org/2000/svg"/>
    </svg>);
};
exports["default"] = Chevron;
