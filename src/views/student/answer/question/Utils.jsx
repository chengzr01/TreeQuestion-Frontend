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
      options: node.data.options,
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
