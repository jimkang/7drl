function recycleElement(rootSel, className, tag) {
  var sel = rootSel.select('.' + className);
  if (sel.empty()) {
    sel = rootSel.append(tag).classed(className, true);
  }
  return sel;
}

module.exports = recycleElement;
