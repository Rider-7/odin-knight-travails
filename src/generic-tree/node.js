class Node {
  constructor(data = null, parent = null) {
    this.data = data;
    this.parent = parent;
    this.children = null;
  }
}

module.exports = {
  Node,
};
