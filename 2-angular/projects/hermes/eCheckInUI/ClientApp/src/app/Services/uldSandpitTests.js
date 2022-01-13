/* run node uldSandpitTests */
var a = [
  {
    "uldMetadata": {
      "uldNumber": "AKE-12345-NZ",
      "uldStatus": 0
    },
    "containerContentInfo": {
      "86-99998883": {
        "numberOfPieces": "3",
        "weight": "150"
      }
    }
  },
  {
    "uldMetadata": {
      "uldNumber": "PMC-12345-NZ",
    },
    "containerContentInfo": {
      "86-99998883": {
        "numberOfPieces": "2",
        "weight": "100"
      },
      "86-44444444": {
        "numberOfPieces": "1",
        "weight": "100"
      }
    }
  }
];
console.log('>>nodeTest: a = ' + JSON.stringify(a, null, 2) );

console.warn('expect 1: result = ' + a.findIndex(x => x.uldMetadata.uldNumber === 'PMC-12345-NZ') );
console.warn('expect -1: result = ' + a.findIndex(x => x.uldMetadata.uldNumber === 'rubbish') );
