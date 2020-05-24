import { unapply, unconstruct, getOwnPropertyDescriptor } from './utils';

/**
 *
 * @param {Object} NodeProto
 * @returns {Object}
 */
function nodeUtils(globalWindowObject) {
  const proto = globalWindowObject.Node.prototype;

  const nodeChildNodesGetter = unapply(
    getOwnPropertyDescriptor(proto, 'childNodes').get
  );
  const nodeCloneNode = unapply(proto.cloneNode);
  const nodeInsertBefore = unapply(proto.insertBefore);

  const nodeOwnerDocumentGetter = unapply(
    getOwnPropertyDescriptor(proto, 'ownerDocument').get
  );
  const nodeNameGetter = unapply(
    getOwnPropertyDescriptor(proto, 'nodeName').get
  );
  const nodeParentNodeGetter = unapply(
    getOwnPropertyDescriptor(proto, 'parentNode').get
  );
  const nodeRemoveChild = unapply(proto.removeChild);
  const nodeTypeGetter = unapply(
    getOwnPropertyDescriptor(proto, 'nodeType').get
  );

  return {
    nodeChildNodesGetter,
    nodeCloneNode,
    nodeInsertBefore,
    nodeOwnerDocumentGetter,
    nodeNameGetter,
    nodeParentNodeGetter,
    nodeRemoveChild,
    nodeTypeGetter,
  };
}

function documentUtils(globalWindowObject) {
  const proto = globalWindowObject.Document.prototype;

  const documentBodyGetter = unapply(
    getOwnPropertyDescriptor(proto, 'body').get
  );
  const documentCreateDocumentFragment = unapply(proto.createDocumentFragment);
  const documentCreateElement = unapply(proto.createElement);
  const documentCreateNodeIterator = unapply(proto.createNodeIterator);
  const documentCreateTextNode = unapply(proto.createTextNode);

  const documentCurrentScriptGetter = unapply(
    getOwnPropertyDescriptor(proto, 'currentScript').get
  );

  const documentElementGetter = unapply(
    getOwnPropertyDescriptor(proto, 'documentElement').get
  );

  const documentGetElementsByTagName = unapply(proto.getElementsByTagName);

  const documentImplementationGetter = unapply(
    getOwnPropertyDescriptor(proto, 'implementation').get
  );

  const documentImportNode = unapply(proto.importNode);

  const documentModeDescriptor = getOwnPropertyDescriptor(
    proto,
    'documentMode'
  );
  const documentModeGetter = documentModeDescriptor
    ? unapply(documentModeDescriptor.get)
    : function () {};

  const documentQuerySelector = unapply(proto.querySelector);
  return {
    documentBodyGetter,
    documentCreateDocumentFragment,
    documentCreateElement,
    documentCreateNodeIterator,
    documentCreateTextNode,
    documentCurrentScriptGetter,
    documentElementGetter,
    documentGetElementsByTagName,
    documentImplementationGetter,
    documentImportNode,
    documentModeGetter,
    documentQuerySelector,
  };
}

function htmlElements(globalWindowObject) {
  const { HTMLTemplateElement } = globalWindowObject;

  const templateContentGetter = unapply(
    getOwnPropertyDescriptor(HTMLTemplateElement.prototype, 'content').get
  );

  return {
    templateContentGetter,
  };
}

function elementUtils(globalWindowObject) {
  const proto = globalWindowObject.Element.prototype;

  const elementFirstElementChildGetter = unapply(
    getOwnPropertyDescriptor(proto, 'firstElementChild').get
  );

  const elementGetAttribute = unapply(proto.getAttribute);
  const elementGetAttributeNode = unapply(proto.getAttributeNode);
  const elementHasAttribute = unapply(proto.hasAttribute);

  const innerHTMLdescriptor = getOwnPropertyDescriptor(proto, 'innerHTML');
  const elementInnerHTMLGetter = unapply(innerHTMLdescriptor.get);
  const elementInnerHTMLSetter = unapply(innerHTMLdescriptor.set);

  const elementInsertAdjacentHTML = unapply(proto.insertAdjacentHTML);

  const outerHTMLDescriptor = getOwnPropertyDescriptor(proto, 'outerHTML');
  const elementOuterHTMLSetter = unapply(outerHTMLDescriptor.set);
  const elementOuterHTMLGetter = unapply(outerHTMLDescriptor.get);

  const elementQuerySelectorAll = unapply(proto.querySelectorAll);
  const elementRemoveAttribute = unapply(proto.removeAttribute);

  return {
    elementFirstElementChildGetter,
    elementGetAttribute,
    elementGetAttributeNode,
    elementHasAttribute,
    elementInnerHTMLGetter,
    elementInnerHTMLSetter,
    elementInsertAdjacentHTML,
    elementOuterHTMLGetter,
    elementOuterHTMLSetter,
    elementQuerySelectorAll,
    elementRemoveAttribute,
  };
}

function domImplementation(globalWindowObject) {
  const proto = globalWindowObject.DOMImplementation.prototype;

  const domImplementationCreateHTMLDocument = unapply(proto.createHTMLDocument);

  return { domImplementationCreateHTMLDocument };
}

function domParser(globalWindowObject) {
  const { DOMParser } = globalWindowObject;

  if (!DOMParser) {
    return null;
  }

  const proto = DOMParser.prototype;

  const domParserCreate = unconstruct(DOMParser);
  const domParserParseFromString = unapply(proto.parseFromString);

  return {
    domParserCreate,
    domParserParseFromString,
  };
}

export function factoryDOMUtils() {
  let utilObject;

  return function (globalWindowObject) {
    if (utilObject) {
      return utilObject;
    }

    utilObject = Object.assign(
      {},
      documentUtils(globalWindowObject),
      domImplementation(globalWindowObject),
      elementUtils(globalWindowObject),
      htmlElements(globalWindowObject),
      nodeUtils(globalWindowObject),
      domParser(globalWindowObject)
    );

    return utilObject;
  };
}

export const initializeDOMUtils = factoryDOMUtils();
