"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AirwayBill = /** @class */ (function () {
    function AirwayBill(id, aWBNumber, origin, destination, numberOfPieces, weight, volume) {
        if (id === void 0) { id = ''; }
        if (aWBNumber === void 0) { aWBNumber = ''; }
        if (origin === void 0) { origin = ''; }
        if (destination === void 0) { destination = ''; }
        if (numberOfPieces === void 0) { numberOfPieces = ''; }
        if (weight === void 0) { weight = ''; }
        if (volume === void 0) { volume = ''; }
        this.id = id;
        this.aWBNumber = aWBNumber;
        this.origin = origin;
        this.destination = destination;
        this.numberOfPieces = numberOfPieces;
        this.weight = weight;
        this.volume = volume;
    }
    return AirwayBill;
}());
exports.AirwayBill = AirwayBill;
//# sourceMappingURL=airwaybill.js.map