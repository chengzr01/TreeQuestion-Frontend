export const getTreeRoot = (unformattedTree) => {
  const inDegree = unformattedTree.nodes.map((node) => {
    return { id: node.id, degree: 0 };
  });
  for (var edgeIndex in unformattedTree.edges) {
    for (var nodeIndex in inDegree) {
      if (inDegree[nodeIndex].id === unformattedTree.edges[edgeIndex].target) {
        inDegree[nodeIndex].degree += 1;
      }
    }
  }
  var rootList = [];
  for (nodeIndex in inDegree) {
    if (inDegree[nodeIndex].degree === 0) {
      rootList.push(inDegree[nodeIndex].id);
    }
  }
  return rootList;
};

export const getNodeList = (sourceTree) => {
  var rootList = getTreeRoot(sourceTree);
  var root = rootList[0];
  var formattedTree = sourceTree.nodes.map((node) => {
    return {
      id: node.id,
      pid: 0,
      parent: "",
      children: [],
      concept: node.data.concept,
      level: node.data.level,
      type: node.data.type,
      stem: node.data.stem,
      options: node.data.options.split("\n"),
      answer: node.data.answer,
    };
  });
  var visitRecord = sourceTree.nodes.map((node) => {
    return { id: node.id, visit: false };
  });
  var nodeList = [];
  var nodeIndexList = [];
  var s = [];
  s.push(root);
  while (s.length > 0) {
    var v = s.pop();
    var visitIndex = 0;
    for (var visitRecordIndex in visitRecord) {
      if (visitRecord[visitRecordIndex].id === v) {
        visitIndex = visitRecordIndex;
      }
    }
    if (!visitRecord[visitIndex].visit) {
      var currentIndex = 0;
      for (var formattedTreeIndex in formattedTree) {
        if (formattedTree[formattedTreeIndex].id === v) {
          currentIndex = formattedTreeIndex;
        }
      }
      visitRecord[visitIndex].visit = true;
      nodeIndexList.push(v);
      for (var edgeIndex in sourceTree.edges) {
        var value = sourceTree.edges[edgeIndex];
        if (value.source === v) {
          s.push(value.target);
          for (formattedTreeIndex in formattedTree) {
            var nodeValue = formattedTree[formattedTreeIndex];
            if (nodeValue.id === value.target) {
              nodeValue.parent = v;
              formattedTree[currentIndex].children.push(nodeValue.id);
              nodeValue.pid = formattedTree[currentIndex].pid + 1;
            }
          }
        }
      }
    }
  }
  for (var index in nodeIndexList) {
    for (formattedTreeIndex in formattedTree) {
      if (formattedTree[formattedTreeIndex].id === nodeIndexList[index]) {
        nodeList.push(formattedTree[formattedTreeIndex]);
      }
    }
  }
  return nodeList;
};

export const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const sampleTree = {
  nodes: [
    {
      id: "1",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 625,
        y: 0,
      },
      data: {
        id: "1",
        label: "1",
        level: "Remember",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Hashing",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      width: 206,
      height: 50,
      selected: false,
      positionAbsolute: {
        x: 285.7919004467401,
        y: -188.8323982130396,
      },
      dragging: false,
    },
    {
      id: "3",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 1125,
        y: 100,
      },
      data: {
        id: "3",
        label: "3",
        level: "Remember",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. ??? \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Message Authentication Code",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      width: 263,
      height: 50,
      selected: false,
      positionAbsolute: {
        x: 98,
        y: 92,
      },
      dragging: true,
    },
    {
      id: "4",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 125,
        y: 100,
      },
      data: {
        id: "4",
        label: "4",
        level: "Remember",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. !!! \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Hashing",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      width: 109,
      height: 50,
      selected: false,
      positionAbsolute: {
        x: -20,
        y: 72,
      },
      dragging: false,
    },
    {
      id: "5",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 625,
        y: 100,
      },
      data: {
        id: "5",
        label: "5",
        level: "Remember",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. *** \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Symmetric Encryption",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      width: 206,
      height: 50,
      selected: false,
      positionAbsolute: {
        x: 61.58678908801937,
        y: -5.901012444157573,
      },
      dragging: false,
    },
    {
      id: "6",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 0,
        y: 200,
      },
      data: {
        id: "6",
        label: "6",
        level: "Apply",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Hashing",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      width: 109,
      height: 50,
      selected: false,
      positionAbsolute: {
        x: 277,
        y: 256,
      },
      dragging: false,
    },
    {
      id: "7",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 250,
        y: 200,
      },
      data: {
        id: "7",
        label: "7",
        level: "Understand",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Hashing",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      selected: false,
      positionAbsolute: {
        x: 631,
        y: 324,
      },
      dragging: false,
      width: 109,
      height: 50,
    },
    {
      id: "8",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 125,
        y: 300,
      },
      data: {
        id: "8",
        label: "8",
        level: "Analyze",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Hashing",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      selected: false,
      positionAbsolute: {
        x: 581,
        y: 432,
      },
      dragging: false,
      width: 109,
      height: 50,
    },
    {
      id: "9",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 500,
        y: 300,
      },
      data: {
        id: "9",
        label: "9",
        level: "Evaluate",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Hashing",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      selected: false,
      positionAbsolute: {
        x: 781,
        y: 438,
      },
      dragging: false,
      width: 109,
      height: 50,
    },
    {
      id: "10",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 125,
        y: 400,
      },
      data: {
        id: "10",
        label: "10",
        level: "Evaluate",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Hashing",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      selected: false,
      positionAbsolute: {
        x: 567,
        y: 525.9999999999999,
      },
      dragging: false,
      width: 118,
      height: 50,
    },
    {
      id: "11",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 500,
        y: 200,
      },
      data: {
        id: "11",
        label: "11",
        level: "Apply",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Symmetric Encryption",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      selected: false,
      positionAbsolute: {
        x: 858.9999999999998,
        y: 228,
      },
      dragging: false,
      width: 214,
      height: 50,
    },
    {
      id: "12",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 750,
        y: 200,
      },
      data: {
        id: "12",
        label: "12",
        level: "Analyze",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Symmetric Encryption",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      width: 215,
      height: 50,
      selected: false,
      positionAbsolute: {
        x: 1094.9999999999998,
        y: 168,
      },
      dragging: false,
    },
    {
      id: "13",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 1000,
        y: 200,
      },
      data: {
        id: "13",
        label: "13",
        level: "Apply",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Message Authentication Code",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      selected: false,
      positionAbsolute: {
        x: 33,
        y: 170.32500000000005,
      },
      dragging: false,
      width: 272,
      height: 50,
    },
    {
      id: "14",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 1250,
        y: 200,
      },
      data: {
        id: "14",
        label: "14",
        level: "Evaluate",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Message Authentication Code",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      width: 272,
      height: 50,
      selected: false,
      positionAbsolute: {
        x: 81,
        y: 320,
      },
      dragging: false,
    },
    {
      id: "15",
      type: "treenode",
      draggable: true,
      connectable: true,
      position: {
        x: 1000,
        y: 300,
      },
      data: {
        id: "15",
        label: "15",
        level: "Create",
        type: "True-False",
        stem: "What is a potential vulnerability associated with symmetric encryption?",
        options:
          " A. The length of the key \n  B. The randomness of the key \n C. The secrecy of the key \n D. The type of encryption algorithm used",
        answer: "C",
        concept: "Message Authentication Code",
      },
      targetPosition: "top",
      sourcePosition: "bottom",
      width: 272,
      height: 50,
      selected: false,
      positionAbsolute: {
        x: 916,
        y: 341.525,
      },
      dragging: false,
    },
  ],
  edges: [
    {
      source: "1",
      sourceHandle: null,
      target: "3",
      targetHandle: null,
      id: "reactflow__edge-1-3",
    },
    {
      source: "1",
      sourceHandle: null,
      target: "4",
      targetHandle: null,
      id: "reactflow__edge-1-4",
    },
    {
      source: "1",
      sourceHandle: null,
      target: "5",
      targetHandle: null,
      id: "reactflow__edge-1-5",
    },
    {
      source: "4",
      sourceHandle: null,
      target: "7",
      targetHandle: null,
      id: "reactflow__edge-4-7",
    },
    {
      source: "4",
      sourceHandle: null,
      target: "6",
      targetHandle: null,
      id: "reactflow__edge-4-6",
    },
    {
      source: "7",
      sourceHandle: null,
      target: "8",
      targetHandle: null,
      id: "reactflow__edge-7-8",
    },
    {
      source: "7",
      sourceHandle: null,
      target: "9",
      targetHandle: null,
      id: "reactflow__edge-7-9",
    },
    {
      source: "8",
      sourceHandle: null,
      target: "10",
      targetHandle: null,
      id: "reactflow__edge-8-10",
    },
    {
      source: "5",
      sourceHandle: null,
      target: "11",
      targetHandle: null,
      id: "reactflow__edge-5-11",
    },
    {
      source: "5",
      sourceHandle: null,
      target: "12",
      targetHandle: null,
      id: "reactflow__edge-5-12",
    },
    {
      source: "3",
      sourceHandle: null,
      target: "13",
      targetHandle: null,
      id: "reactflow__edge-3-13",
    },
    {
      source: "3",
      sourceHandle: null,
      target: "14",
      targetHandle: null,
      id: "reactflow__edge-3-14",
    },
    {
      source: "13",
      sourceHandle: null,
      target: "15",
      targetHandle: null,
      id: "reactflow__edge-13-15",
    },
  ],
};