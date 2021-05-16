function byTagName(node, tagName, foundNodes = []) {
  for (const child of node.childNodes) {
    if (child.tagName?.toLowerCase() === tagName.toLowerCase()) {
      foundNodes.push(child);
    }

    byTagName(child, tagName, foundNodes);
  }

  return foundNodes;
}
