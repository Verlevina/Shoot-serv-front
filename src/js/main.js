
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toString = exports.cdr = exports.car = exports.cons = exports.checkPair = exports.isPair = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Check if something is pair
 * @example
 * const pair = cons(5, 'hello');
 * isPair(pair); // true
 * isPair(5); // false
 */
var isPair = function isPair(pair) {
  return typeof pair === 'function' && pair.pair;
};

exports.isPair = isPair;

var checkPair = function checkPair(pair) {
  if (!isPair(pair)) {
    var value = _typeof(pair) === 'object' ? JSON.stringify(pair, null, 2) : String(pair);
    throw new Error("Argument must be pair, but it was '".concat(value, "'"));
  }
};
/**
 * Build pair
 * @example
 * const pair = cons(5, 'hello');
 * @example
 * const pair = cons(cons(1, null), 'world');
 */


exports.checkPair = checkPair;

var cons = function cons(a, b) {
  var pair = function pair(message) {
    switch (message) {
      case 'car':
        return a;

      case 'cdr':
        return b;

      default:
        throw new Error("Unknown message '".concat(message, "'"));
    }
  };

  pair.pair = true;
  return pair;
};
/**
 * Get car (first element) from pair
 * @example
 * const pair = cons(5, 'hello');
 * car(pair); // 5
 */


exports.cons = cons;

var car = function car(pair) {
  checkPair(pair);
  return pair('car');
};
/**
 * Get cdr (second element) from pair
 * @example
 * const pair = cons(5, 'hello');
 * cdr(pair); // hello
 */


exports.car = car;

var cdr = function cdr(pair) {
  checkPair(pair);
  return pair('cdr');
};
/**
 * Convert pair to string (recursively)
 * @example
 * toString(cons('', 10)); // ('', 10)
 */


exports.cdr = cdr;

var toString = function toString(pair) {
  checkPair(pair);

  var rec = function rec(p) {
    if (!isPair(p)) {
      return String(p);
    }

    var left = car(p);
    var right = cdr(p);
    return "(".concat(rec(left), ", ").concat(rec(right), ")");
  };

  return rec(pair);
};

exports.toString = toString;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = exports.filter = exports.map = exports.toString = exports.addChild = exports.children = exports.hasChildren = exports.is = exports.value = exports.name = exports.node = exports.append = exports.make = undefined;

var _hexletPairs = require('hexlet-pairs');

var _hexletPairsData = require('hexlet-pairs-data');

var data = _interopRequireWildcard(_hexletPairsData);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Make a list of nodes
 * @example
 * make(node('span', 'hello'), node('span', 'world'));
 */
var make = exports.make = function make() {
  return data.l();
};

/**
 * Append node to a list of nodes
 * @example
 * const dom = make();
 * append(dom, node('h2', 'hello, world'));
 *
 */
var append = exports.append = function append(dom, element) {
  return data.cons(element, dom);
};

/**
 * Make a node
 * @example
 * node('h2', 'hello, world');
 * node('div', l(node('p', 'one'), node('p', 'two')));
 */
var node = exports.node = function node(tag) {
  var mix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : data.l();
  return (0, _hexletPairs.cons)(tag, mix);
};

/**
 * Get node's name
 * @example
 * name(node('p', 'hello, world')); // p
 */
var name = exports.name = function name(element) {
  return (0, _hexletPairs.car)(element);
};

/**
 * Get node's value
 * @example
 * value(node('p', 'hello, world')); // hello, world
 */
var value = exports.value = function value(element) {
  return (0, _hexletPairs.cdr)(element);
};

/**
 * Check if node is tag
 * @example
 * is('h3', node('h3', 'hexlet')); // true
 * is('h3', node('h6', 'hexlet')); // false
 */
var is = exports.is = function is(tagName, element) {
  return tagName === name(element);
};

/**
 * Check if node has children
 * @example
 * hasChildren(node('h3', 'hexlet')); // false
 * hasChildren(node('div', l(node('p', 'wow')))); // true
 */
var hasChildren = exports.hasChildren = function hasChildren(element) {
  return (0, _hexletPairs.isPair)((0, _hexletPairs.cdr)(element));
};

/**
 * Get node's children
 * @example
 * const children = l(node('p', 'wow'), node('p', 'hey'));
 * children(node('div', children)); // [('p', 'wow'), ('p', 'hey')]
 */
var children = exports.children = function children(element) {
  return (0, _hexletPairs.cdr)(element);
};

/**
 * Add child to node
 * @example
 * const node = node('div');
 * addChild(node, node('p', 'html tags'));
 */
var addChild = exports.addChild = function addChild(element, child) {
  return data.cons(name(element), data.cons(child, children(element)));
};

/**
 * Convert list of nodes to string
 * @example
 * const tags = make(node('p', 'text'), node('p', 'text2'));
 * toString(tags); // <p>text</p><p>text2</p>
 */
var toString = exports.toString = function toString(elements) {
  if (data.isEmpty(elements)) {
    return '';
  }
  var element = data.head(elements);
  var tag = name(element);
  var body = hasChildren(element) ? toString(children(element)) : value(element);
  return toString(data.tail(elements)) + '<' + tag + '>' + body + '</' + tag + '>';
};

/**
 * Map a list of nodes
 * @example
 * map(element => {
 *   if (is('h2', element)) {
 *     return node('h3', value(element));
 *   }
 *   return element;
 * }, dom);
 */
var map = exports.map = function map(func, elements) {
  return data.map(func, elements);
};

/**
 * Filter a list of nodes
 * @example
 * filter(element => is('h2', element), dom);
 */
var filter = exports.filter = function filter(func, elements) {
  return data.filter(func, elements);
};

/**
 * Reduce a list of nodes
 * @example
 * reduce((element, acc) => acc + 1, 0, dom);
 */
var reduce = exports.reduce = function reduce(func, init, elements) {
  return data.reduce(func, init, elements);
};
const select = (tagName, tree) => {


  console.log(listToString(listToString(tree)));

  const iter = (tree, acc) => {

    let newAcc = l(acc, reduce((element, acc) => is(tagName, element) ? consList(element, acc) : acc, l(), tree));

    const current = head(tree);
    const rest = tail(tree);
    if (hasChildren(current)){
      newAcc = l(newAcc, iter(tree, newAcc))
    } else if(is(tagName, current)) {
      newAcc = l(newAcc, current);
      return iter(rest, newAcc);
    }

    return newAcc;
  };
  return iter(tree, l());
};



const dom1 = make();
const children1 = l(node('a', l(node('span', 'scheme'))));
const dom2 = append(dom1, node('h1', children1));
const dom3 = append(dom2, node('p', 'is a lisp'));
const children2 = l(node('li', 'item 1'), node('li', 'item 2'));
const dom4 = append(dom3, node('ul', children2));
const children3 = l(node('li', 'item 1'), node('li', 'item 2'));
const dom5 = append(dom4, node('ol', children3));
const dom6 = append(dom5, node('p', 'is a functional language'));
const children4 = l(node('li', 'item'));
const dom7 = append(dom6, node('ul', children4));
const dom8 = append(dom7, node('div', l(node('p', 'another text'))));
const dom9 = append(dom8, node('div', l(node('div', l(node('p', l(node('span', 'text'))))))));
const dom10 = append(dom9, node('h1', 'prolog'));
const dom = append(dom10, node('p', 'is about logic'));

select('span', dom);