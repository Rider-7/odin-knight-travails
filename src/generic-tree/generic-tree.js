const { Node } = require('./node');

class GenericTree {
  constructor(data) {
    this.root = new Node(data);
  }

  leafOrder(callback = null) {
    const leafOrder = [];
    const queue = [this.root];
    let visit;

    while (queue.length !== 0) {
      visit = queue.shift();
      if (visit.children === null) leafOrder.push(visit);
      else visit.children.forEach((node) => queue.push(node));
    }

    if (callback === null) {
      return leafOrder;
    }
    leafOrder.forEach((node) => callback(node));
    return null;
  }

  levelOrder(callback = null) {
    const visitOrder = [];
    const queue = [this.root];
    let visit;

    while (queue.length !== 0) {
      visit = queue.shift();
      visit.children.forEach((node) => queue.push(node));
      visitOrder.push(visit);
    }

    if (callback === null) {
      const visitOrderValues = [];
      visitOrder.forEach((node) => visitOrderValues.push(node.data));
      return visitOrderValues;
    }
    visitOrder.forEach((node) => callback(node));
    return null;
  }
}

module.exports = {
  GenericTree,
};
