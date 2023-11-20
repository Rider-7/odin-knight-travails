const { GenericTree } = require('./generic-tree/generic-tree');
const { Node } = require('./generic-tree/node');

function findAllLegalMoves(position) {
  const arr = [];
  const xAxis = position[0];
  const yAxis = position[1];

  function isLegal(x, y) {
    if ((x >= 0 && y >= 0) && (x < 8 && y < 8)) return true;
    return false;
  }

  if (!(isLegal(xAxis, yAxis))) throw new Error('Invalid input position.');

  // 1st quadrant.
  arr.push([xAxis + 2, yAxis + 1]);
  arr.push([xAxis + 1, yAxis + 2]);

  // 4th quadrant.
  arr.push([xAxis + 2, yAxis - 1]);
  arr.push([xAxis + 1, yAxis - 2]);

  // 2nd quadrant.
  arr.push([xAxis - 2, yAxis + 1]);
  arr.push([xAxis - 1, yAxis + 2]);

  // 3rd quadrant.
  arr.push([xAxis - 2, yAxis - 1]);
  arr.push([xAxis - 1, yAxis - 2]);

  const legalMoves = [];
  arr.forEach((newPosition) => {
    const xNewAxis = newPosition[0];
    const yNewAxis = newPosition[1];
    if (isLegal(xNewAxis, yNewAxis)) legalMoves.push(newPosition);
  });

  return legalMoves;
}

function addAllLegalMovesAsChildren(parentNode) {
  const legalMoves = findAllLegalMoves(parentNode.data);

  const childrenArr = [];
  legalMoves.forEach((move) => childrenArr.push(new Node(move, parentNode)));

  const update = { children: childrenArr };
  Object.assign(parentNode, update);
}

function knightMoves(start, destination) {
  const treeA = new GenericTree(start);
  const treeB = new GenericTree(destination);

  function findMatchingLeafNodes() {
    const leavesA = treeA.leafOrder();
    const leavesB = treeB.leafOrder();

    const matchingNodes = [];
    leavesA.forEach((nodeA) => {
      leavesB.forEach((nodeB) => {
        // Hacky way to compare if arrays are equal.
        if (nodeA.data.toString() === nodeB.data.toString()) matchingNodes.push([nodeA, nodeB]);
      });
    });

    if (matchingNodes.length === 0) return null;
    return matchingNodes;
  }

  let matchingLeafNodes = null;
  // Limit max depth for either trees is 3.
  for (let i = 0; i < 3; i += 1) {
    treeA.leafOrder(addAllLegalMovesAsChildren);
    treeB.leafOrder(addAllLegalMovesAsChildren);
    matchingLeafNodes = findMatchingLeafNodes();
    if (matchingLeafNodes !== null) break;
  }
  if (matchingLeafNodes === null) throw new Error('Max search depth reached.');

  function getOptimalPaths() {
    function getLeafToRootPath(leafNode) {
      const path = [];

      let currentNode = leafNode;
      while (currentNode !== null) {
        path.push(currentNode.data);
        currentNode = currentNode.parent;
      }
      if (path.length === 0) throw new Error('Issue in finding path to root node for a leaf node.');
      return path;
    }

    const optimalPaths = [];
    matchingLeafNodes.forEach((pair) => {
      const nodeA = pair[0];
      const nodeB = pair[1];

      const pathA = getLeafToRootPath(nodeA);
      const pathB = getLeafToRootPath(nodeB);
      pathA.reverse();
      pathA.pop();

      const optimalPath = pathA.concat(pathB);
      optimalPaths.push(optimalPath);
    });
    return optimalPaths;
  }

  const optimalPaths = getOptimalPaths();
  return optimalPaths;
}

knightMoves([0, 0], [7, 7]).forEach((optimalMoves) => console.log(optimalMoves));
