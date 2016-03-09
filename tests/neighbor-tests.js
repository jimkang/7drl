var test = require('tape');
var GetNeighbors = require('../get-neighbors');
var graphData = require('./fixtures/graph-data');

var expectedNeighbors = [
  [
    {
      "label": "node 1",
      "id": "LskP"
    },
    {
      "label": "node 2",
      "id": "cmIt"
    },
    {
      "label": "node 38",
      "id": "QwBD"
    },
    {
      "label": "node 39",
      "id": "ViSI"
    }
  ],
  [
    {
      "label": "node 0",
      "id": "sxIK"
    },
    {
      "label": "node 2",
      "id": "cmIt"
    },
    {
      "label": "node 3",
      "id": "fDYm"
    },
    {
      "label": "node 39",
      "id": "ViSI"
    }
  ],
  [
    {
      "label": "node 0",
      "id": "sxIK"
    },
    {
      "label": "node 1",
      "id": "LskP"
    },
    {
      "label": "node 3",
      "id": "fDYm"
    },
    {
      "label": "node 4",
      "id": "cbFO"
    }
  ],
  [
    {
      "label": "node 1",
      "id": "LskP"
    },
    {
      "label": "node 2",
      "id": "cmIt"
    },
    {
      "label": "node 4",
      "id": "cbFO"
    },
    {
      "label": "node 28",
      "id": "Suyc"
    }
  ],
  [
    {
      "label": "node 2",
      "id": "cmIt"
    },
    {
      "label": "node 3",
      "id": "fDYm"
    },
    {
      "label": "node 5",
      "id": "QYwt"
    },
    {
      "label": "node 6",
      "id": "LRbt"
    }
  ],
  [
    {
      "label": "node 4",
      "id": "cbFO"
    },
    {
      "label": "node 6",
      "id": "LRbt"
    },
    {
      "label": "node 7",
      "id": "boGc"
    },
    {
      "label": "node 24",
      "id": "DvAK"
    }
  ],
  [
    {
      "label": "node 4",
      "id": "cbFO"
    },
    {
      "label": "node 5",
      "id": "QYwt"
    },
    {
      "label": "node 30",
      "id": "zKTO"
    },
    {
      "label": "node 8",
      "id": "AiDz"
    },
    {
      "label": "node 26",
      "id": "OUOa"
    }
  ],
  [
    {
      "label": "node 5",
      "id": "QYwt"
    },
    {
      "label": "node 8",
      "id": "AiDz"
    },
    {
      "label": "node 26",
      "id": "OUOa"
    },
    {
      "label": "node 28",
      "id": "Suyc"
    }
  ],
  [
    {
      "label": "node 6",
      "id": "LRbt"
    },
    {
      "label": "node 7",
      "id": "boGc"
    },
    {
      "label": "node 9",
      "id": "guOS"
    },
    {
      "label": "node 10",
      "id": "vGGG"
    },
    {
      "label": "node 18",
      "id": "mRhT"
    },
    {
      "label": "node 23",
      "id": "Kbsh"
    }
  ],
  [
    {
      "label": "node 8",
      "id": "AiDz"
    },
    {
      "label": "node 10",
      "id": "vGGG"
    },
    {
      "label": "node 11",
      "id": "IPIf"
    }
  ],
  [
    {
      "label": "node 8",
      "id": "AiDz"
    },
    {
      "label": "node 9",
      "id": "guOS"
    },
    {
      "label": "node 22",
      "id": "XtIy"
    },
    {
      "label": "node 12",
      "id": "Dsxk"
    }
  ],
  [
    {
      "label": "node 9",
      "id": "guOS"
    },
    {
      "label": "node 19",
      "id": "RGut"
    },
    {
      "label": "node 13",
      "id": "xVsS"
    }
  ],
  [
    {
      "label": "node 10",
      "id": "vGGG"
    },
    {
      "label": "node 13",
      "id": "xVsS"
    },
    {
      "label": "node 24",
      "id": "DvAK"
    },
    {
      "label": "node 29",
      "id": "iztH"
    }
  ],
  [
    {
      "label": "node 11",
      "id": "IPIf"
    },
    {
      "label": "node 12",
      "id": "Dsxk"
    },
    {
      "label": "node 14",
      "id": "BvvN"
    },
    {
      "label": "node 15",
      "id": "DmGq"
    }
  ],
  [
    {
      "label": "node 13",
      "id": "xVsS"
    },
    {
      "label": "node 15",
      "id": "DmGq"
    },
    {
      "label": "node 16",
      "id": "ivXo"
    }
  ],
  [
    {
      "label": "node 13",
      "id": "xVsS"
    },
    {
      "label": "node 14",
      "id": "BvvN"
    },
    {
      "label": "node 16",
      "id": "ivXo"
    },
    {
      "label": "node 17",
      "id": "HCtr"
    },
    {
      "label": "node 24",
      "id": "DvAK"
    }
  ],
  [
    {
      "label": "node 14",
      "id": "BvvN"
    },
    {
      "label": "node 15",
      "id": "DmGq"
    },
    {
      "label": "node 17",
      "id": "HCtr"
    },
    {
      "label": "node 18",
      "id": "mRhT"
    }
  ],
  [
    {
      "label": "node 15",
      "id": "DmGq"
    },
    {
      "label": "node 16",
      "id": "ivXo"
    },
    {
      "label": "node 18",
      "id": "mRhT"
    },
    {
      "label": "node 19",
      "id": "RGut"
    }
  ],
  [
    {
      "label": "node 16",
      "id": "ivXo"
    },
    {
      "label": "node 17",
      "id": "HCtr"
    },
    {
      "label": "node 19",
      "id": "RGut"
    },
    {
      "label": "node 8",
      "id": "AiDz"
    }
  ],
  [
    {
      "label": "node 11",
      "id": "IPIf"
    },
    {
      "label": "node 17",
      "id": "HCtr"
    },
    {
      "label": "node 18",
      "id": "mRhT"
    },
    {
      "label": "node 20",
      "id": "EtcS"
    },
    {
      "label": "node 21",
      "id": "NmRS"
    }
  ],
  [
    {
      "label": "node 19",
      "id": "RGut"
    },
    {
      "label": "node 21",
      "id": "NmRS"
    },
    {
      "label": "node 22",
      "id": "XtIy"
    }
  ],
  [
    {
      "label": "node 19",
      "id": "RGut"
    },
    {
      "label": "node 20",
      "id": "EtcS"
    },
    {
      "label": "node 22",
      "id": "XtIy"
    },
    {
      "label": "node 35",
      "id": "PojY"
    }
  ],
  [
    {
      "label": "node 10",
      "id": "vGGG"
    },
    {
      "label": "node 20",
      "id": "EtcS"
    },
    {
      "label": "node 21",
      "id": "NmRS"
    },
    {
      "label": "node 23",
      "id": "Kbsh"
    },
    {
      "label": "node 24",
      "id": "DvAK"
    }
  ],
  [
    {
      "label": "node 22",
      "id": "XtIy"
    },
    {
      "label": "node 24",
      "id": "DvAK"
    },
    {
      "label": "node 8",
      "id": "AiDz"
    }
  ],
  [
    {
      "label": "node 12",
      "id": "Dsxk"
    },
    {
      "label": "node 22",
      "id": "XtIy"
    },
    {
      "label": "node 23",
      "id": "Kbsh"
    },
    {
      "label": "node 5",
      "id": "QYwt"
    },
    {
      "label": "node 15",
      "id": "DmGq"
    }
  ],
  [
    {
      "label": "node 26",
      "id": "OUOa"
    },
    {
      "label": "node 27",
      "id": "XjGC"
    }
  ],
  [
    {
      "label": "node 7",
      "id": "boGc"
    },
    {
      "label": "node 25",
      "id": "qKJt"
    },
    {
      "label": "node 27",
      "id": "XjGC"
    },
    {
      "label": "node 6",
      "id": "LRbt"
    }
  ],
  [
    {
      "label": "node 25",
      "id": "qKJt"
    },
    {
      "label": "node 26",
      "id": "OUOa"
    },
    {
      "label": "node 28",
      "id": "Suyc"
    },
    {
      "label": "node 29",
      "id": "iztH"
    }
  ],
  [
    {
      "label": "node 3",
      "id": "fDYm"
    },
    {
      "label": "node 27",
      "id": "XjGC"
    },
    {
      "label": "node 29",
      "id": "iztH"
    },
    {
      "label": "node 7",
      "id": "boGc"
    }
  ],
  [
    {
      "label": "node 27",
      "id": "XjGC"
    },
    {
      "label": "node 28",
      "id": "Suyc"
    },
    {
      "label": "node 12",
      "id": "Dsxk"
    },
    {
      "label": "node 31",
      "id": "TqbS"
    }
  ],
  [
    {
      "label": "node 6",
      "id": "LRbt"
    },
    {
      "label": "node 31",
      "id": "TqbS"
    },
    {
      "label": "node 32",
      "id": "SbVT"
    }
  ],
  [
    {
      "label": "node 29",
      "id": "iztH"
    },
    {
      "label": "node 30",
      "id": "zKTO"
    },
    {
      "label": "node 32",
      "id": "SbVT"
    },
    {
      "label": "node 33",
      "id": "aVhm"
    }
  ],
  [
    {
      "label": "node 30",
      "id": "zKTO"
    },
    {
      "label": "node 31",
      "id": "TqbS"
    },
    {
      "label": "node 33",
      "id": "aVhm"
    },
    {
      "label": "node 34",
      "id": "FCNS"
    },
    {
      "label": "node 33",
      "id": "aVhm"
    }
  ],
  [
    {
      "label": "node 31",
      "id": "TqbS"
    },
    {
      "label": "node 32",
      "id": "SbVT"
    },
    {
      "label": "node 32",
      "id": "SbVT"
    },
    {
      "label": "node 35",
      "id": "PojY"
    }
  ],
  [
    {
      "label": "node 32",
      "id": "SbVT"
    },
    {
      "label": "node 35",
      "id": "PojY"
    },
    {
      "label": "node 36",
      "id": "WEfU"
    }
  ],
  [
    {
      "label": "node 21",
      "id": "NmRS"
    },
    {
      "label": "node 33",
      "id": "aVhm"
    },
    {
      "label": "node 34",
      "id": "FCNS"
    },
    {
      "label": "node 36",
      "id": "WEfU"
    },
    {
      "label": "node 37",
      "id": "gkFB"
    }
  ],
  [
    {
      "label": "node 34",
      "id": "FCNS"
    },
    {
      "label": "node 35",
      "id": "PojY"
    },
    {
      "label": "node 37",
      "id": "gkFB"
    },
    {
      "label": "node 38",
      "id": "QwBD"
    }
  ],
  [
    {
      "label": "node 35",
      "id": "PojY"
    },
    {
      "label": "node 36",
      "id": "WEfU"
    },
    {
      "label": "node 38",
      "id": "QwBD"
    },
    {
      "label": "node 39",
      "id": "ViSI"
    }
  ],
  [
    {
      "label": "node 36",
      "id": "WEfU"
    },
    {
      "label": "node 37",
      "id": "gkFB"
    },
    {
      "label": "node 39",
      "id": "ViSI"
    },
    {
      "label": "node 0",
      "id": "sxIK"
    }
  ],
  [
    {
      "label": "node 37",
      "id": "gkFB"
    },
    {
      "label": "node 38",
      "id": "QwBD"
    },
    {
      "label": "node 0",
      "id": "sxIK"
    },
    {
      "label": "node 1",
      "id": "LskP"
    }
  ]
];

var getNeighbors = GetNeighbors({
  nodes: graphData.nodes,
  links: graphData.links
});

graphData.nodes.forEach(runTest);

function runTest(node, i) {
  test('neighbor test', neighborTest);

  function neighborTest(t) {
    t.deepEqual(getNeighbors(node.id), expectedNeighbors[i], 'Correct neighbors returned.');
    t.end();
  }
}
