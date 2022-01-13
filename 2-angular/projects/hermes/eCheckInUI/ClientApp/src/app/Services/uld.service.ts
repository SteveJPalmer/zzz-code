import { Injectable } from '@angular/core';
import {Booking, ULD, ULDMetadata } from '../models';

@Injectable()
export class UldService {

  uldCargoInfo: Array<ULD>;

  constructor() { }

  /* extract ULDs from AWB booking */
  extractULDs(bookingInfo: Booking[]) {
    // console.info('>>UldService >extractULDs() >Booking: ' + JSON.stringify(bookingInfo, null, 2) );
    var coll = [];
    bookingInfo.forEach(booking => {
      // console.error('>>uldManifest: ' + JSON.stringify(booking.uldManifest, null, 2) );
      for (var prop in booking.uldManifest) {
        if (booking.uldManifest.hasOwnProperty(prop)) {		// ensure not inherited base class prop
          // console.warn(prop + ' ' + booking.uldManifest[prop].numberOfPieces + ' ' + booking.uldManifest[prop].weight);
          coll.push({ serial: prop, pieces: booking.uldManifest[prop].numberOfPieces, weight: booking.uldManifest[prop].weight });
        }
      }
    });
    // console.warn('return: ' + JSON.stringify(coll, null, 2 ));
    return coll;
  }

  /* create ULD array item */
  createReqULD(awbNumber, uld) {
    let uldMetadata = { 'uldNumber': uld.serial, "uldStatus": 0 };
    let containerContentInfo = { [awbNumber]: { "numberOfPieces": uld.pieces, "weight": uld.weight } };
    const uldNew = new ULD (uldMetadata, containerContentInfo);
    this.uldCargoInfo.push(uldNew);
  }

  /* update ULD array item */
  updateReqULD(awbNumber, uld, index) {
    let newUld = { "numberOfPieces": uld.pieces, "weight": uld.weight };
    this.uldCargoInfo[index].containerContentInfo = { ...this.uldCargoInfo[index].containerContentInfo, [awbNumber]: newUld };
  }

  /* search for matching ULD serial */
  searchReqULD(serial) {
    return this.uldCargoInfo.findIndex(x => x.uldMetadata.uldNumber === serial);
  }

  initializeULDCargoInfo() {
    this.uldCargoInfo = [];
  }

  getULDCargoInfo() {
    return this.uldCargoInfo;
  }
}
