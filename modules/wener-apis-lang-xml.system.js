System.register(['react', 'antd', '@wener/ui'], function (exports) {
  'use strict';
  var React, useCallback, useState, useEffect, Row, Col, Card, Alert, Button, createSubscriptionContainer;
  return {
    setters: [function (module) {
      React = module.default;
      useCallback = module.useCallback;
      useState = module.useState;
      useEffect = module.useEffect;
    }, function (module) {
      Row = module.Row;
      Col = module.Col;
      Card = module.Card;
      Alert = module.Alert;
      Button = module.Button;
    }, function (module) {
      createSubscriptionContainer = module.createSubscriptionContainer;
    }],
    execute: function () {

      function _extends() {
        _extends = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        return _extends.apply(this, arguments);
      }

      var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

      function createCommonjsModule(fn, basedir, module) {
      	return module = {
      	  path: basedir,
      	  exports: {},
      	  require: function (path, base) {
            return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
          }
      	}, fn(module, module.exports), module.exports;
      }

      function commonjsRequire () {
      	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
      }

      var util = createCommonjsModule(function (module, exports) {

        const nameStartChar = ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
        const nameChar = nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
        const nameRegexp = '[' + nameStartChar + '][' + nameChar + ']*';
        const regexName = new RegExp('^' + nameRegexp + '$');

        const getAllMatches = function (string, regex) {
          const matches = [];
          let match = regex.exec(string);

          while (match) {
            const allmatches = [];
            const len = match.length;

            for (let index = 0; index < len; index++) {
              allmatches.push(match[index]);
            }

            matches.push(allmatches);
            match = regex.exec(string);
          }

          return matches;
        };

        const isName = function (string) {
          const match = regexName.exec(string);
          return !(match === null || typeof match === 'undefined');
        };

        exports.isExist = function (v) {
          return typeof v !== 'undefined';
        };

        exports.isEmptyObject = function (obj) {
          return Object.keys(obj).length === 0;
        };
        /**
         * Copy all the properties of a into b.
         * @param {*} target
         * @param {*} a
         */


        exports.merge = function (target, a, arrayMode) {
          if (a) {
            const keys = Object.keys(a); // will return an array of own properties

            const len = keys.length; //don't make it inline

            for (let i = 0; i < len; i++) {
              if (arrayMode === 'strict') {
                target[keys[i]] = [a[keys[i]]];
              } else {
                target[keys[i]] = a[keys[i]];
              }
            }
          }
        };
        /* exports.merge =function (b,a){
          return Object.assign(b,a);
        } */


        exports.getValue = function (v) {
          if (exports.isExist(v)) {
            return v;
          } else {
            return '';
          }
        }; // const fakeCall = function(a) {return a;};
        // const fakeCallNoReturn = function() {};


        exports.buildOptions = function (options, defaultOptions, props) {
          var newOptions = {};

          if (!options) {
            return defaultOptions; //if there are not options
          }

          for (let i = 0; i < props.length; i++) {
            if (options[props[i]] !== undefined) {
              newOptions[props[i]] = options[props[i]];
            } else {
              newOptions[props[i]] = defaultOptions[props[i]];
            }
          }

          return newOptions;
        };

        exports.isName = isName;
        exports.getAllMatches = getAllMatches;
        exports.nameRegexp = nameRegexp;
      });

      const convertToJson = function (node, options) {
        const jObj = {}; //when no child node or attr is present

        if ((!node.child || util.isEmptyObject(node.child)) && (!node.attrsMap || util.isEmptyObject(node.attrsMap))) {
          return util.isExist(node.val) ? node.val : '';
        } else {
          //otherwise create a textnode if node has some text
          if (util.isExist(node.val)) {
            if (!(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
              if (options.arrayMode === "strict") {
                jObj[options.textNodeName] = [node.val];
              } else {
                jObj[options.textNodeName] = node.val;
              }
            }
          }
        }

        util.merge(jObj, node.attrsMap, options.arrayMode);
        const keys = Object.keys(node.child);

        for (let index = 0; index < keys.length; index++) {
          var tagname = keys[index];

          if (node.child[tagname] && node.child[tagname].length > 1) {
            jObj[tagname] = [];

            for (var tag in node.child[tagname]) {
              jObj[tagname].push(convertToJson(node.child[tagname][tag], options));
            }
          } else {
            if (options.arrayMode === true) {
              const result = convertToJson(node.child[tagname][0], options);
              if (typeof result === 'object') jObj[tagname] = [result];else jObj[tagname] = result;
            } else if (options.arrayMode === "strict") {
              jObj[tagname] = [convertToJson(node.child[tagname][0], options)];
            } else {
              jObj[tagname] = convertToJson(node.child[tagname][0], options);
            }
          }
        } //add value


        return jObj;
      };

      var convertToJson_1 = convertToJson;
      var node2json = {
        convertToJson: convertToJson_1
      };

      var xmlNode = function (tagname, parent, val) {
        this.tagname = tagname;
        this.parent = parent;
        this.child = {}; //child tags

        this.attrsMap = {}; //attributes map

        this.val = val; //text only

        this.addChild = function (child) {
          if (Array.isArray(this.child[child.tagname])) {
            //already presents
            this.child[child.tagname].push(child);
          } else {
            this.child[child.tagname] = [child];
          }
        };
      };

      const buildOptions = util.buildOptions;
      const regx = '<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'.replace(/NAME/g, util.nameRegexp); //const tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
      //const tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");
      //polyfill

      if (!Number.parseInt && window.parseInt) {
        Number.parseInt = window.parseInt;
      }

      if (!Number.parseFloat && window.parseFloat) {
        Number.parseFloat = window.parseFloat;
      }

      const defaultOptions = {
        attributeNamePrefix: '@_',
        attrNodeName: false,
        textNodeName: '#text',
        ignoreAttributes: true,
        ignoreNameSpace: false,
        allowBooleanAttributes: false,
        //a tag can have attributes without any value
        //ignoreRootElement : false,
        parseNodeValue: true,
        parseAttributeValue: false,
        arrayMode: false,
        trimValues: true,
        //Trim string values of tag and attributes
        cdataTagName: false,
        cdataPositionChar: '\\c',
        tagValueProcessor: function (a, tagName) {
          return a;
        },
        attrValueProcessor: function (a, attrName) {
          return a;
        },
        stopNodes: [] //decodeStrict: false,

      };
      var defaultOptions_1 = defaultOptions;
      const props = ['attributeNamePrefix', 'attrNodeName', 'textNodeName', 'ignoreAttributes', 'ignoreNameSpace', 'allowBooleanAttributes', 'parseNodeValue', 'parseAttributeValue', 'arrayMode', 'trimValues', 'cdataTagName', 'cdataPositionChar', 'tagValueProcessor', 'attrValueProcessor', 'parseTrueNumberOnly', 'stopNodes'];
      var props_1 = props;
      /**
       * Trim -> valueProcessor -> parse value
       * @param {string} tagName
       * @param {string} val
       * @param {object} options
       */

      function processTagValue(tagName, val, options) {
        if (val) {
          if (options.trimValues) {
            val = val.trim();
          }

          val = options.tagValueProcessor(val, tagName);
          val = parseValue(val, options.parseNodeValue, options.parseTrueNumberOnly);
        }

        return val;
      }

      function resolveNameSpace(tagname, options) {
        if (options.ignoreNameSpace) {
          const tags = tagname.split(':');
          const prefix = tagname.charAt(0) === '/' ? '/' : '';

          if (tags[0] === 'xmlns') {
            return '';
          }

          if (tags.length === 2) {
            tagname = prefix + tags[1];
          }
        }

        return tagname;
      }

      function parseValue(val, shouldParse, parseTrueNumberOnly) {
        if (shouldParse && typeof val === 'string') {
          let parsed;

          if (val.trim() === '' || isNaN(val)) {
            parsed = val === 'true' ? true : val === 'false' ? false : val;
          } else {
            if (val.indexOf('0x') !== -1) {
              //support hexa decimal
              parsed = Number.parseInt(val, 16);
            } else if (val.indexOf('.') !== -1) {
              parsed = Number.parseFloat(val);
              val = val.replace(/\.?0+$/, "");
            } else {
              parsed = Number.parseInt(val, 10);
            }

            if (parseTrueNumberOnly) {
              parsed = String(parsed) === val ? parsed : val;
            }
          }

          return parsed;
        } else {
          if (util.isExist(val)) {
            return val;
          } else {
            return '';
          }
        }
      } //TODO: change regex to capture NS
      //const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");


      const attrsRegx = new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])(.*?)\\3)?', 'g');

      function buildAttributesMap(attrStr, options) {
        if (!options.ignoreAttributes && typeof attrStr === 'string') {
          attrStr = attrStr.replace(/\r?\n/g, ' '); //attrStr = attrStr || attrStr.trim();

          const matches = util.getAllMatches(attrStr, attrsRegx);
          const len = matches.length; //don't make it inline

          const attrs = {};

          for (let i = 0; i < len; i++) {
            const attrName = resolveNameSpace(matches[i][1], options);

            if (attrName.length) {
              if (matches[i][4] !== undefined) {
                if (options.trimValues) {
                  matches[i][4] = matches[i][4].trim();
                }

                matches[i][4] = options.attrValueProcessor(matches[i][4], attrName);
                attrs[options.attributeNamePrefix + attrName] = parseValue(matches[i][4], options.parseAttributeValue, options.parseTrueNumberOnly);
              } else if (options.allowBooleanAttributes) {
                attrs[options.attributeNamePrefix + attrName] = true;
              }
            }
          }

          if (!Object.keys(attrs).length) {
            return;
          }

          if (options.attrNodeName) {
            const attrCollection = {};
            attrCollection[options.attrNodeName] = attrs;
            return attrCollection;
          }

          return attrs;
        }
      }

      const getTraversalObj = function (xmlData, options) {
        xmlData = xmlData.replace(/(\r\n)|\n/, " ");
        options = buildOptions(options, defaultOptions, props);
        const xmlObj = new xmlNode('!xml');
        let currentNode = xmlObj;
        let textData = ""; //function match(xmlData){

        for (let i = 0; i < xmlData.length; i++) {
          const ch = xmlData[i];

          if (ch === '<') {
            if (xmlData[i + 1] === '/') {
              //Closing Tag
              const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
              let tagName = xmlData.substring(i + 2, closeIndex).trim();

              if (options.ignoreNameSpace) {
                const colonIndex = tagName.indexOf(":");

                if (colonIndex !== -1) {
                  tagName = tagName.substr(colonIndex + 1);
                }
              }
              /* if (currentNode.parent) {
                currentNode.parent.val = util.getValue(currentNode.parent.val) + '' + processTagValue2(tagName, textData , options);
              } */


              if (currentNode) {
                if (currentNode.val) {
                  currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(tagName, textData, options);
                } else {
                  currentNode.val = processTagValue(tagName, textData, options);
                }
              }

              if (options.stopNodes.length && options.stopNodes.includes(currentNode.tagname)) {
                currentNode.child = [];

                if (currentNode.attrsMap == undefined) {
                  currentNode.attrsMap = {};
                }

                currentNode.val = xmlData.substr(currentNode.startIndex + 1, i - currentNode.startIndex - 1);
              }

              currentNode = currentNode.parent;
              textData = "";
              i = closeIndex;
            } else if (xmlData[i + 1] === '?') {
              i = findClosingIndex(xmlData, "?>", i, "Pi Tag is not closed.");
            } else if (xmlData.substr(i + 1, 3) === '!--') {
              i = findClosingIndex(xmlData, "-->", i, "Comment is not closed.");
            } else if (xmlData.substr(i + 1, 2) === '!D') {
              const closeIndex = findClosingIndex(xmlData, ">", i, "DOCTYPE is not closed.");
              const tagExp = xmlData.substring(i, closeIndex);

              if (tagExp.indexOf("[") >= 0) {
                i = xmlData.indexOf("]>", i) + 1;
              } else {
                i = closeIndex;
              }
            } else if (xmlData.substr(i + 1, 2) === '![') {
              const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
              const tagExp = xmlData.substring(i + 9, closeIndex); //considerations
              //1. CDATA will always have parent node
              //2. A tag with CDATA is not a leaf node so it's value would be string type.

              if (textData) {
                currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(currentNode.tagname, textData, options);
                textData = "";
              }

              if (options.cdataTagName) {
                //add cdata node
                const childNode = new xmlNode(options.cdataTagName, currentNode, tagExp);
                currentNode.addChild(childNode); //for backtracking

                currentNode.val = util.getValue(currentNode.val) + options.cdataPositionChar; //add rest value to parent node

                if (tagExp) {
                  childNode.val = tagExp;
                }
              } else {
                currentNode.val = (currentNode.val || '') + (tagExp || '');
              }

              i = closeIndex + 2;
            } else {
              //Opening tag
              const result = closingIndexForOpeningTag(xmlData, i + 1);
              let tagExp = result.data;
              const closeIndex = result.index;
              const separatorIndex = tagExp.indexOf(" ");
              let tagName = tagExp;

              if (separatorIndex !== -1) {
                tagName = tagExp.substr(0, separatorIndex).trimRight();
                tagExp = tagExp.substr(separatorIndex + 1);
              }

              if (options.ignoreNameSpace) {
                const colonIndex = tagName.indexOf(":");

                if (colonIndex !== -1) {
                  tagName = tagName.substr(colonIndex + 1);
                }
              } //save text to parent node


              if (currentNode && textData) {
                if (currentNode.tagname !== '!xml') {
                  currentNode.val = util.getValue(currentNode.val) + '' + processTagValue(currentNode.tagname, textData, options);
                }
              }

              if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
                //selfClosing tag
                if (tagName[tagName.length - 1] === "/") {
                  //remove trailing '/'
                  tagName = tagName.substr(0, tagName.length - 1);
                  tagExp = tagName;
                } else {
                  tagExp = tagExp.substr(0, tagExp.length - 1);
                }

                const childNode = new xmlNode(tagName, currentNode, '');

                if (tagName !== tagExp) {
                  childNode.attrsMap = buildAttributesMap(tagExp, options);
                }

                currentNode.addChild(childNode);
              } else {
                //opening tag
                const childNode = new xmlNode(tagName, currentNode);

                if (options.stopNodes.length && options.stopNodes.includes(childNode.tagname)) {
                  childNode.startIndex = closeIndex;
                }

                if (tagName !== tagExp) {
                  childNode.attrsMap = buildAttributesMap(tagExp, options);
                }

                currentNode.addChild(childNode);
                currentNode = childNode;
              }

              textData = "";
              i = closeIndex;
            }
          } else {
            textData += xmlData[i];
          }
        }

        return xmlObj;
      };

      function closingIndexForOpeningTag(data, i) {
        let attrBoundary;
        let tagExp = "";

        for (let index = i; index < data.length; index++) {
          let ch = data[index];

          if (attrBoundary) {
            if (ch === attrBoundary) attrBoundary = ""; //reset
          } else if (ch === '"' || ch === "'") {
            attrBoundary = ch;
          } else if (ch === '>') {
            return {
              data: tagExp,
              index: index
            };
          } else if (ch === '\t') {
            ch = " ";
          }

          tagExp += ch;
        }
      }

      function findClosingIndex(xmlData, str, i, errMsg) {
        const closingIndex = xmlData.indexOf(str, i);

        if (closingIndex === -1) {
          throw new Error(errMsg);
        } else {
          return closingIndex + str.length - 1;
        }
      }

      var getTraversalObj_1 = getTraversalObj;
      var xmlstr2xmlnode = {
        defaultOptions: defaultOptions_1,
        props: props_1,
        getTraversalObj: getTraversalObj_1
      };

      const defaultOptions$1 = {
        allowBooleanAttributes: false //A tag can have attributes without any value

      };
      const props$1 = ['allowBooleanAttributes']; //const tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");

      var validate = function (xmlData, options) {
        options = util.buildOptions(options, defaultOptions$1, props$1); //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
        //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
        //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE

        const tags = [];
        let tagFound = false; //indicates that the root tag has been closed (aka. depth 0 has been reached)

        let reachedRoot = false;

        if (xmlData[0] === '\ufeff') {
          // check for byte order mark (BOM)
          xmlData = xmlData.substr(1);
        }

        for (let i = 0; i < xmlData.length; i++) {
          if (xmlData[i] === '<') {
            //starting of tag
            //read until you reach to '>' avoiding any '>' in attribute value
            i++;

            if (xmlData[i] === '?') {
              i = readPI(xmlData, ++i);

              if (i.err) {
                return i;
              }
            } else if (xmlData[i] === '!') {
              i = readCommentAndCDATA(xmlData, i);
              continue;
            } else {
              let closingTag = false;

              if (xmlData[i] === '/') {
                //closing tag
                closingTag = true;
                i++;
              } //read tagname


              let tagName = '';

              for (; i < xmlData.length && xmlData[i] !== '>' && xmlData[i] !== ' ' && xmlData[i] !== '\t' && xmlData[i] !== '\n' && xmlData[i] !== '\r'; i++) {
                tagName += xmlData[i];
              }

              tagName = tagName.trim(); //console.log(tagName);

              if (tagName[tagName.length - 1] === '/') {
                //self closing tag without attributes
                tagName = tagName.substring(0, tagName.length - 1); //continue;

                i--;
              }

              if (!validateTagName(tagName)) {
                let msg;

                if (tagName.trim().length === 0) {
                  msg = "There is an unnecessary space between tag name and backward slash '</ ..'.";
                } else {
                  msg = "Tag '" + tagName + "' is an invalid name.";
                }

                return getErrorObject('InvalidTag', msg, getLineNumberForPosition(xmlData, i));
              }

              const result = readAttributeStr(xmlData, i);

              if (result === false) {
                return getErrorObject('InvalidAttr', "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
              }

              let attrStr = result.value;
              i = result.index;

              if (attrStr[attrStr.length - 1] === '/') {
                //self closing tag
                attrStr = attrStr.substring(0, attrStr.length - 1);
                const isValid = validateAttributeString(attrStr, options);

                if (isValid === true) {
                  tagFound = true; //continue; //text may presents after self closing tag
                } else {
                  //the result from the nested function returns the position of the error within the attribute
                  //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
                  //this gives us the absolute index in the entire xml, which we can use to find the line at last
                  return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
                }
              } else if (closingTag) {
                if (!result.tagClosed) {
                  return getErrorObject('InvalidTag', "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
                } else if (attrStr.trim().length > 0) {
                  return getErrorObject('InvalidTag', "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, i));
                } else {
                  const otg = tags.pop();

                  if (tagName !== otg) {
                    return getErrorObject('InvalidTag', "Closing tag '" + otg + "' is expected inplace of '" + tagName + "'.", getLineNumberForPosition(xmlData, i));
                  } //when there are no more tags, we reached the root level.


                  if (tags.length == 0) {
                    reachedRoot = true;
                  }
                }
              } else {
                const isValid = validateAttributeString(attrStr, options);

                if (isValid !== true) {
                  //the result from the nested function returns the position of the error within the attribute
                  //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
                  //this gives us the absolute index in the entire xml, which we can use to find the line at last
                  return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
                } //if the root level has been reached before ...


                if (reachedRoot === true) {
                  return getErrorObject('InvalidXml', 'Multiple possible root nodes found.', getLineNumberForPosition(xmlData, i));
                } else {
                  tags.push(tagName);
                }

                tagFound = true;
              } //skip tag text value
              //It may include comments and CDATA value


              for (i++; i < xmlData.length; i++) {
                if (xmlData[i] === '<') {
                  if (xmlData[i + 1] === '!') {
                    //comment or CADATA
                    i++;
                    i = readCommentAndCDATA(xmlData, i);
                    continue;
                  } else {
                    break;
                  }
                } else if (xmlData[i] === '&') {
                  const afterAmp = validateAmpersand(xmlData, i);
                  if (afterAmp == -1) return getErrorObject('InvalidChar', "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
                  i = afterAmp;
                }
              } //end of reading tag text value


              if (xmlData[i] === '<') {
                i--;
              }
            }
          } else {
            if (xmlData[i] === ' ' || xmlData[i] === '\t' || xmlData[i] === '\n' || xmlData[i] === '\r') {
              continue;
            }

            return getErrorObject('InvalidChar', "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
          }
        }

        if (!tagFound) {
          return getErrorObject('InvalidXml', 'Start tag expected.', 1);
        } else if (tags.length > 0) {
          return getErrorObject('InvalidXml', "Invalid '" + JSON.stringify(tags, null, 4).replace(/\r?\n/g, '') + "' found.", 1);
        }

        return true;
      };
      /**
       * Read Processing insstructions and skip
       * @param {*} xmlData
       * @param {*} i
       */


      function readPI(xmlData, i) {
        var start = i;

        for (; i < xmlData.length; i++) {
          if (xmlData[i] == '?' || xmlData[i] == ' ') {
            //tagname
            var tagname = xmlData.substr(start, i - start);

            if (i > 5 && tagname === 'xml') {
              return getErrorObject('InvalidXml', 'XML declaration allowed only at the start of the document.', getLineNumberForPosition(xmlData, i));
            } else if (xmlData[i] == '?' && xmlData[i + 1] == '>') {
              //check if valid attribut string
              i++;
              break;
            } else {
              continue;
            }
          }
        }

        return i;
      }

      function readCommentAndCDATA(xmlData, i) {
        if (xmlData.length > i + 5 && xmlData[i + 1] === '-' && xmlData[i + 2] === '-') {
          //comment
          for (i += 3; i < xmlData.length; i++) {
            if (xmlData[i] === '-' && xmlData[i + 1] === '-' && xmlData[i + 2] === '>') {
              i += 2;
              break;
            }
          }
        } else if (xmlData.length > i + 8 && xmlData[i + 1] === 'D' && xmlData[i + 2] === 'O' && xmlData[i + 3] === 'C' && xmlData[i + 4] === 'T' && xmlData[i + 5] === 'Y' && xmlData[i + 6] === 'P' && xmlData[i + 7] === 'E') {
          let angleBracketsCount = 1;

          for (i += 8; i < xmlData.length; i++) {
            if (xmlData[i] === '<') {
              angleBracketsCount++;
            } else if (xmlData[i] === '>') {
              angleBracketsCount--;

              if (angleBracketsCount === 0) {
                break;
              }
            }
          }
        } else if (xmlData.length > i + 9 && xmlData[i + 1] === '[' && xmlData[i + 2] === 'C' && xmlData[i + 3] === 'D' && xmlData[i + 4] === 'A' && xmlData[i + 5] === 'T' && xmlData[i + 6] === 'A' && xmlData[i + 7] === '[') {
          for (i += 8; i < xmlData.length; i++) {
            if (xmlData[i] === ']' && xmlData[i + 1] === ']' && xmlData[i + 2] === '>') {
              i += 2;
              break;
            }
          }
        }

        return i;
      }

      var doubleQuote = '"';
      var singleQuote = "'";
      /**
       * Keep reading xmlData until '<' is found outside the attribute value.
       * @param {string} xmlData
       * @param {number} i
       */

      function readAttributeStr(xmlData, i) {
        let attrStr = '';
        let startChar = '';
        let tagClosed = false;

        for (; i < xmlData.length; i++) {
          if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
            if (startChar === '') {
              startChar = xmlData[i];
            } else if (startChar !== xmlData[i]) {
              //if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
              continue;
            } else {
              startChar = '';
            }
          } else if (xmlData[i] === '>') {
            if (startChar === '') {
              tagClosed = true;
              break;
            }
          }

          attrStr += xmlData[i];
        }

        if (startChar !== '') {
          return false;
        }

        return {
          value: attrStr,
          index: i,
          tagClosed: tagClosed
        };
      }
      /**
       * Select all the attributes whether valid or invalid.
       */


      const validAttrStrRegxp = new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?', 'g'); //attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""

      function validateAttributeString(attrStr, options) {
        //console.log("start:"+attrStr+":end");
        //if(attrStr.trim().length === 0) return true; //empty string
        const matches = util.getAllMatches(attrStr, validAttrStrRegxp);
        const attrNames = {};

        for (let i = 0; i < matches.length; i++) {
          if (matches[i][1].length === 0) {
            //nospace before attribute name: a="sd"b="saf"
            return getErrorObject('InvalidAttr', "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(attrStr, matches[i][0]));
          } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
            //independent attribute: ab
            return getErrorObject('InvalidAttr', "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(attrStr, matches[i][0]));
          }
          /* else if(matches[i][6] === undefined){//attribute without value: ab=
                          return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                      } */


          const attrName = matches[i][2];

          if (!validateAttrName(attrName)) {
            return getErrorObject('InvalidAttr', "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(attrStr, matches[i][0]));
          }

          if (!attrNames.hasOwnProperty(attrName)) {
            //check for duplicate attribute.
            attrNames[attrName] = 1;
          } else {
            return getErrorObject('InvalidAttr', "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(attrStr, matches[i][0]));
          }
        }

        return true;
      }

      function validateNumberAmpersand(xmlData, i) {
        let re = /\d/;

        if (xmlData[i] === 'x') {
          i++;
          re = /[\da-fA-F]/;
        }

        for (; i < xmlData.length; i++) {
          if (xmlData[i] === ';') return i;
          if (!xmlData[i].match(re)) break;
        }

        return -1;
      }

      function validateAmpersand(xmlData, i) {
        // https://www.w3.org/TR/xml/#dt-charref
        i++;
        if (xmlData[i] === ';') return -1;

        if (xmlData[i] === '#') {
          i++;
          return validateNumberAmpersand(xmlData, i);
        }

        let count = 0;

        for (; i < xmlData.length; i++, count++) {
          if (xmlData[i].match(/\w/) && count < 20) continue;
          if (xmlData[i] === ';') break;
          return -1;
        }

        return i;
      }

      function getErrorObject(code, message, lineNumber) {
        return {
          err: {
            code: code,
            msg: message,
            line: lineNumber
          }
        };
      }

      function validateAttrName(attrName) {
        return util.isName(attrName);
      } // const startsWithXML = /^xml/i;


      function validateTagName(tagname) {
        return util.isName(tagname)
        /* && !tagname.match(startsWithXML) */
        ;
      } //this function returns the line number for the character at the given index


      function getLineNumberForPosition(xmlData, index) {
        var lines = xmlData.substring(0, index).split(/\r?\n/);
        return lines.length;
      } //this function returns the position of the last character of match within attrStr


      function getPositionFromMatch(attrStr, match) {
        return attrStr.indexOf(match) + match.length;
      }

      var validator = {
        validate: validate
      };

      const char = function (a) {
        return String.fromCharCode(a);
      };

      const chars = {
        nilChar: char(176),
        missingChar: char(201),
        nilPremitive: char(175),
        missingPremitive: char(200),
        emptyChar: char(178),
        emptyValue: char(177),
        //empty Premitive
        boundryChar: char(179),
        objStart: char(198),
        arrStart: char(204),
        arrayEnd: char(185)
      };
      const charsArr = [chars.nilChar, chars.nilPremitive, chars.missingChar, chars.missingPremitive, chars.boundryChar, chars.emptyChar, chars.emptyValue, chars.arrayEnd, chars.objStart, chars.arrStart];

      const _e = function (node, e_schema, options) {
        if (typeof e_schema === 'string') {
          //premitive
          if (node && node[0] && node[0].val !== undefined) {
            return getValue(node[0].val);
          } else {
            return getValue(node);
          }
        } else {
          const hasValidData = hasData(node);

          if (hasValidData === true) {
            let str = '';

            if (Array.isArray(e_schema)) {
              //attributes can't be repeated. hence check in children tags only
              str += chars.arrStart;
              const itemSchema = e_schema[0]; //var itemSchemaType = itemSchema;

              const arr_len = node.length;

              if (typeof itemSchema === 'string') {
                for (let arr_i = 0; arr_i < arr_len; arr_i++) {
                  const r = getValue(node[arr_i].val);
                  str = processValue(str, r);
                }
              } else {
                for (let arr_i = 0; arr_i < arr_len; arr_i++) {
                  const r = _e(node[arr_i], itemSchema, options);

                  str = processValue(str, r);
                }
              }

              str += chars.arrayEnd; //indicates that next item is not array item
            } else {
              //object
              str += chars.objStart;
              const keys = Object.keys(e_schema);

              if (Array.isArray(node)) {
                node = node[0];
              }

              for (let i in keys) {
                const key = keys[i]; //a property defined in schema can be present either in attrsMap or children tags
                //options.textNodeName will not present in both maps, take it's value from val
                //options.attrNodeName will be present in attrsMap

                let r;

                if (!options.ignoreAttributes && node.attrsMap && node.attrsMap[key]) {
                  r = _e(node.attrsMap[key], e_schema[key], options);
                } else if (key === options.textNodeName) {
                  r = _e(node.val, e_schema[key], options);
                } else {
                  r = _e(node.child[key], e_schema[key], options);
                }

                str = processValue(str, r);
              }
            }

            return str;
          } else {
            return hasValidData;
          }
        }
      };

      const getValue = function (a
      /*, type*/
      ) {
        switch (a) {
          case undefined:
            return chars.missingPremitive;

          case null:
            return chars.nilPremitive;

          case '':
            return chars.emptyValue;

          default:
            return a;
        }
      };

      const processValue = function (str, r) {
        if (!isAppChar(r[0]) && !isAppChar(str[str.length - 1])) {
          str += chars.boundryChar;
        }

        return str + r;
      };

      const isAppChar = function (ch) {
        return charsArr.indexOf(ch) !== -1;
      };

      function hasData(jObj) {
        if (jObj === undefined) {
          return chars.missingChar;
        } else if (jObj === null) {
          return chars.nilChar;
        } else if (jObj.child && Object.keys(jObj.child).length === 0 && (!jObj.attrsMap || Object.keys(jObj.attrsMap).length === 0)) {
          return chars.emptyChar;
        } else {
          return true;
        }
      }

      const buildOptions$1 = util.buildOptions;

      const convert2nimn = function (node, e_schema, options) {
        options = buildOptions$1(options, xmlstr2xmlnode.defaultOptions, xmlstr2xmlnode.props);
        return _e(node, e_schema, options);
      };

      var convert2nimn_1 = convert2nimn;
      var nimndata = {
        convert2nimn: convert2nimn_1
      };

      const buildOptions$2 = util.buildOptions; //TODO: do it later

      const convertToJsonString = function (node, options) {
        options = buildOptions$2(options, xmlstr2xmlnode.defaultOptions, xmlstr2xmlnode.props);
        options.indentBy = options.indentBy || '';
        return _cToJsonStr(node, options);
      };

      const _cToJsonStr = function (node, options, level) {
        let jObj = '{'; //traver through all the children

        const keys = Object.keys(node.child);

        for (let index = 0; index < keys.length; index++) {
          var tagname = keys[index];

          if (node.child[tagname] && node.child[tagname].length > 1) {
            jObj += '"' + tagname + '" : [ ';

            for (var tag in node.child[tagname]) {
              jObj += _cToJsonStr(node.child[tagname][tag], options) + ' , ';
            }

            jObj = jObj.substr(0, jObj.length - 1) + ' ] '; //remove extra comma in last
          } else {
            jObj += '"' + tagname + '" : ' + _cToJsonStr(node.child[tagname][0], options) + ' ,';
          }
        }

        util.merge(jObj, node.attrsMap); //add attrsMap as new children

        if (util.isEmptyObject(jObj)) {
          return util.isExist(node.val) ? node.val : '';
        } else {
          if (util.isExist(node.val)) {
            if (!(typeof node.val === 'string' && (node.val === '' || node.val === options.cdataPositionChar))) {
              jObj += '"' + options.textNodeName + '" : ' + stringval(node.val);
            }
          }
        } //add value


        if (jObj[jObj.length - 1] === ',') {
          jObj = jObj.substr(0, jObj.length - 2);
        }

        return jObj + '}';
      };

      function stringval(v) {
        if (v === true || v === false || !isNaN(v)) {
          return v;
        } else {
          return '"' + v + '"';
        }
      }

      var convertToJsonString_1 = convertToJsonString;
      var node2json_str = {
        convertToJsonString: convertToJsonString_1
      };

      const buildOptions$3 = util.buildOptions;
      const defaultOptions$2 = {
        attributeNamePrefix: '@_',
        attrNodeName: false,
        textNodeName: '#text',
        ignoreAttributes: true,
        cdataTagName: false,
        cdataPositionChar: '\\c',
        format: false,
        indentBy: '  ',
        supressEmptyNode: false,
        tagValueProcessor: function (a) {
          return a;
        },
        attrValueProcessor: function (a) {
          return a;
        }
      };
      const props$2 = ['attributeNamePrefix', 'attrNodeName', 'textNodeName', 'ignoreAttributes', 'cdataTagName', 'cdataPositionChar', 'format', 'indentBy', 'supressEmptyNode', 'tagValueProcessor', 'attrValueProcessor'];

      function Parser(options) {
        this.options = buildOptions$3(options, defaultOptions$2, props$2);

        if (this.options.ignoreAttributes || this.options.attrNodeName) {
          this.isAttribute = function ()
          /*a*/
          {
            return false;
          };
        } else {
          this.attrPrefixLen = this.options.attributeNamePrefix.length;
          this.isAttribute = isAttribute;
        }

        if (this.options.cdataTagName) {
          this.isCDATA = isCDATA;
        } else {
          this.isCDATA = function ()
          /*a*/
          {
            return false;
          };
        }

        this.replaceCDATAstr = replaceCDATAstr;
        this.replaceCDATAarr = replaceCDATAarr;

        if (this.options.format) {
          this.indentate = indentate;
          this.tagEndChar = '>\n';
          this.newLine = '\n';
        } else {
          this.indentate = function () {
            return '';
          };

          this.tagEndChar = '>';
          this.newLine = '';
        }

        if (this.options.supressEmptyNode) {
          this.buildTextNode = buildEmptyTextNode;
          this.buildObjNode = buildEmptyObjNode;
        } else {
          this.buildTextNode = buildTextValNode;
          this.buildObjNode = buildObjectNode;
        }

        this.buildTextValNode = buildTextValNode;
        this.buildObjectNode = buildObjectNode;
      }

      Parser.prototype.parse = function (jObj) {
        return this.j2x(jObj, 0).val;
      };

      Parser.prototype.j2x = function (jObj, level) {
        let attrStr = '';
        let val = '';
        const keys = Object.keys(jObj);
        const len = keys.length;

        for (let i = 0; i < len; i++) {
          const key = keys[i];

          if (typeof jObj[key] === 'undefined') ; else if (jObj[key] === null) {
            val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
          } else if (jObj[key] instanceof Date) {
            val += this.buildTextNode(jObj[key], key, '', level);
          } else if (typeof jObj[key] !== 'object') {
            //premitive type
            const attr = this.isAttribute(key);

            if (attr) {
              attrStr += ' ' + attr + '="' + this.options.attrValueProcessor('' + jObj[key]) + '"';
            } else if (this.isCDATA(key)) {
              if (jObj[this.options.textNodeName]) {
                val += this.replaceCDATAstr(jObj[this.options.textNodeName], jObj[key]);
              } else {
                val += this.replaceCDATAstr('', jObj[key]);
              }
            } else {
              //tag value
              if (key === this.options.textNodeName) {
                if (jObj[this.options.cdataTagName]) ; else {
                  val += this.options.tagValueProcessor('' + jObj[key]);
                }
              } else {
                val += this.buildTextNode(jObj[key], key, '', level);
              }
            }
          } else if (Array.isArray(jObj[key])) {
            //repeated nodes
            if (this.isCDATA(key)) {
              val += this.indentate(level);

              if (jObj[this.options.textNodeName]) {
                val += this.replaceCDATAarr(jObj[this.options.textNodeName], jObj[key]);
              } else {
                val += this.replaceCDATAarr('', jObj[key]);
              }
            } else {
              //nested nodes
              const arrLen = jObj[key].length;

              for (let j = 0; j < arrLen; j++) {
                const item = jObj[key][j];

                if (typeof item === 'undefined') ; else if (item === null) {
                  val += this.indentate(level) + '<' + key + '/' + this.tagEndChar;
                } else if (typeof item === 'object') {
                  const result = this.j2x(item, level + 1);
                  val += this.buildObjNode(result.val, key, result.attrStr, level);
                } else {
                  val += this.buildTextNode(item, key, '', level);
                }
              }
            }
          } else {
            //nested node
            if (this.options.attrNodeName && key === this.options.attrNodeName) {
              const Ks = Object.keys(jObj[key]);
              const L = Ks.length;

              for (let j = 0; j < L; j++) {
                attrStr += ' ' + Ks[j] + '="' + this.options.attrValueProcessor('' + jObj[key][Ks[j]]) + '"';
              }
            } else {
              const result = this.j2x(jObj[key], level + 1);
              val += this.buildObjNode(result.val, key, result.attrStr, level);
            }
          }
        }

        return {
          attrStr: attrStr,
          val: val
        };
      };

      function replaceCDATAstr(str, cdata) {
        str = this.options.tagValueProcessor('' + str);

        if (this.options.cdataPositionChar === '' || str === '') {
          return str + '<![CDATA[' + cdata + ']]' + this.tagEndChar;
        } else {
          return str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata + ']]' + this.tagEndChar);
        }
      }

      function replaceCDATAarr(str, cdata) {
        str = this.options.tagValueProcessor('' + str);

        if (this.options.cdataPositionChar === '' || str === '') {
          return str + '<![CDATA[' + cdata.join(']]><![CDATA[') + ']]' + this.tagEndChar;
        } else {
          for (let v in cdata) {
            str = str.replace(this.options.cdataPositionChar, '<![CDATA[' + cdata[v] + ']]>');
          }

          return str + this.newLine;
        }
      }

      function buildObjectNode(val, key, attrStr, level) {
        if (attrStr && !val.includes('<')) {
          return this.indentate(level) + '<' + key + attrStr + '>' + val + //+ this.newLine
          // + this.indentate(level)
          '</' + key + this.tagEndChar;
        } else {
          return this.indentate(level) + '<' + key + attrStr + this.tagEndChar + val + //+ this.newLine
          this.indentate(level) + '</' + key + this.tagEndChar;
        }
      }

      function buildEmptyObjNode(val, key, attrStr, level) {
        if (val !== '') {
          return this.buildObjectNode(val, key, attrStr, level);
        } else {
          return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar; //+ this.newLine
        }
      }

      function buildTextValNode(val, key, attrStr, level) {
        return this.indentate(level) + '<' + key + attrStr + '>' + this.options.tagValueProcessor(val) + '</' + key + this.tagEndChar;
      }

      function buildEmptyTextNode(val, key, attrStr, level) {
        if (val !== '') {
          return this.buildTextValNode(val, key, attrStr, level);
        } else {
          return this.indentate(level) + '<' + key + attrStr + '/' + this.tagEndChar;
        }
      }

      function indentate(level) {
        return this.options.indentBy.repeat(level);
      }

      function isAttribute(name
      /*, options*/
      ) {
        if (name.startsWith(this.options.attributeNamePrefix)) {
          return name.substr(this.attrPrefixLen);
        } else {
          return false;
        }
      }

      function isCDATA(name) {
        return name === this.options.cdataTagName;
      } //formatting
      //indentation
      //\n after each closing or self closing tag


      var json2xml = Parser;

      var parser = createCommonjsModule(function (module, exports) {

        const x2xmlnode = xmlstr2xmlnode;
        const buildOptions = util.buildOptions;

        exports.parse = function (xmlData, options, validationOption) {
          if (validationOption) {
            if (validationOption === true) validationOption = {};
            const result = validator.validate(xmlData, validationOption);

            if (result !== true) {
              throw Error(result.err.msg);
            }
          }

          options = buildOptions(options, x2xmlnode.defaultOptions, x2xmlnode.props);
          const traversableObj = xmlstr2xmlnode.getTraversalObj(xmlData, options); //print(traversableObj, "  ");

          return node2json.convertToJson(traversableObj, options);
        };

        exports.convertTonimn = nimndata.convert2nimn;
        exports.getTraversalObj = xmlstr2xmlnode.getTraversalObj;
        exports.convertToJson = node2json.convertToJson;
        exports.convertToJsonString = node2json_str.convertToJsonString;
        exports.validate = validator.validate;
        exports.j2xParser = json2xml;

        exports.parseToNimn = function (xmlData, schema, options) {
          return exports.convertTonimn(exports.getTraversalObj(xmlData, options), schema, options);
        };
      });

      var lib = createCommonjsModule(function (module, exports) {

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _extends = Object.assign || function (target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        };

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }

          return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        }();

        var React$1 = _interopRequireWildcard(React);

        function _interopRequireWildcard(obj) {
          if (obj && obj.__esModule) {
            return obj;
          } else {
            var newObj = {};

            if (obj != null) {
              for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
              }
            }

            newObj.default = obj;
            return newObj;
          }
        }

        function _objectWithoutProperties(obj, keys) {
          var target = {};

          for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
          }

          return target;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        /* global global */


        var KEYCODE_ENTER = 13;
        var KEYCODE_TAB = 9;
        var KEYCODE_BACKSPACE = 8;
        var KEYCODE_Y = 89;
        var KEYCODE_Z = 90;
        var KEYCODE_M = 77;
        var KEYCODE_PARENS = 57;
        var KEYCODE_BRACKETS = 219;
        var KEYCODE_QUOTE = 222;
        var KEYCODE_BACK_QUOTE = 192;
        var KEYCODE_ESCAPE = 27;
        var HISTORY_LIMIT = 100;
        var HISTORY_TIME_GAP = 3000;
        var isWindows = 'navigator' in commonjsGlobal && /Win/i.test(navigator.platform);
        var isMacLike = 'navigator' in commonjsGlobal && /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
        var className = 'npm__react-simple-code-editor__textarea';
        var cssText =
        /* CSS */
        '\n/**\n * Reset the text fill color so that placeholder is visible\n */\n.' + className + ':empty {\n  -webkit-text-fill-color: inherit !important;\n}\n\n/**\n * Hack to apply on some CSS on IE10 and IE11\n */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  /**\n    * IE doesn\'t support \'-webkit-text-fill-color\'\n    * So we use \'color: transparent\' to make the text transparent on IE\n    * Unlike other browsers, it doesn\'t affect caret color in IE\n    */\n  .' + className + ' {\n    color: transparent !important;\n  }\n\n  .' + className + '::selection {\n    background-color: #accef7 !important;\n    color: transparent !important;\n  }\n}\n';

        var Editor = function (_React$Component) {
          _inherits(Editor, _React$Component);

          function Editor() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, Editor);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Editor.__proto__ || Object.getPrototypeOf(Editor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
              capture: true
            }, _this._recordCurrentState = function () {
              var input = _this._input;
              if (!input) return; // Save current state of the input

              var value = input.value,
                  selectionStart = input.selectionStart,
                  selectionEnd = input.selectionEnd;

              _this._recordChange({
                value: value,
                selectionStart: selectionStart,
                selectionEnd: selectionEnd
              });
            }, _this._getLines = function (text, position) {
              return text.substring(0, position).split('\n');
            }, _this._recordChange = function (record) {
              var overwrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
              var _this$_history = _this._history,
                  stack = _this$_history.stack,
                  offset = _this$_history.offset;

              if (stack.length && offset > -1) {
                // When something updates, drop the redo operations
                _this._history.stack = stack.slice(0, offset + 1); // Limit the number of operations to 100

                var count = _this._history.stack.length;

                if (count > HISTORY_LIMIT) {
                  var extras = count - HISTORY_LIMIT;
                  _this._history.stack = stack.slice(extras, count);
                  _this._history.offset = Math.max(_this._history.offset - extras, 0);
                }
              }

              var timestamp = Date.now();

              if (overwrite) {
                var last = _this._history.stack[_this._history.offset];

                if (last && timestamp - last.timestamp < HISTORY_TIME_GAP) {
                  // A previous entry exists and was in short interval
                  // Match the last word in the line
                  var re = /[^a-z0-9]([a-z0-9]+)$/i; // Get the previous line

                  var previous = _this._getLines(last.value, last.selectionStart).pop().match(re); // Get the current line


                  var current = _this._getLines(record.value, record.selectionStart).pop().match(re);

                  if (previous && current && current[1].startsWith(previous[1])) {
                    // The last word of the previous line and current line match
                    // Overwrite previous entry so that undo will remove whole word
                    _this._history.stack[_this._history.offset] = _extends({}, record, {
                      timestamp: timestamp
                    });
                    return;
                  }
                }
              } // Add the new operation to the stack


              _this._history.stack.push(_extends({}, record, {
                timestamp: timestamp
              }));

              _this._history.offset++;
            }, _this._updateInput = function (record) {
              var input = _this._input;
              if (!input) return; // Update values and selection state

              input.value = record.value;
              input.selectionStart = record.selectionStart;
              input.selectionEnd = record.selectionEnd;

              _this.props.onValueChange(record.value);
            }, _this._applyEdits = function (record) {
              // Save last selection state
              var input = _this._input;
              var last = _this._history.stack[_this._history.offset];

              if (last && input) {
                _this._history.stack[_this._history.offset] = _extends({}, last, {
                  selectionStart: input.selectionStart,
                  selectionEnd: input.selectionEnd
                });
              } // Save the changes


              _this._recordChange(record);

              _this._updateInput(record);
            }, _this._undoEdit = function () {
              var _this$_history2 = _this._history,
                  stack = _this$_history2.stack,
                  offset = _this$_history2.offset; // Get the previous edit

              var record = stack[offset - 1];

              if (record) {
                // Apply the changes and update the offset
                _this._updateInput(record);

                _this._history.offset = Math.max(offset - 1, 0);
              }
            }, _this._redoEdit = function () {
              var _this$_history3 = _this._history,
                  stack = _this$_history3.stack,
                  offset = _this$_history3.offset; // Get the next edit

              var record = stack[offset + 1];

              if (record) {
                // Apply the changes and update the offset
                _this._updateInput(record);

                _this._history.offset = Math.min(offset + 1, stack.length - 1);
              }
            }, _this._handleKeyDown = function (e) {
              var _this$props = _this.props,
                  tabSize = _this$props.tabSize,
                  insertSpaces = _this$props.insertSpaces,
                  ignoreTabKey = _this$props.ignoreTabKey,
                  onKeyDown = _this$props.onKeyDown;

              if (onKeyDown) {
                onKeyDown(e);

                if (e.defaultPrevented) {
                  return;
                }
              }

              if (e.keyCode === KEYCODE_ESCAPE) {
                e.target.blur();
              }

              var _e$target = e.target,
                  value = _e$target.value,
                  selectionStart = _e$target.selectionStart,
                  selectionEnd = _e$target.selectionEnd;
              var tabCharacter = (insertSpaces ? ' ' : '\t').repeat(tabSize);

              if (e.keyCode === KEYCODE_TAB && !ignoreTabKey && _this.state.capture) {
                // Prevent focus change
                e.preventDefault();

                if (e.shiftKey) {
                  // Unindent selected lines
                  var linesBeforeCaret = _this._getLines(value, selectionStart);

                  var startLine = linesBeforeCaret.length - 1;
                  var endLine = _this._getLines(value, selectionEnd).length - 1;
                  var nextValue = value.split('\n').map(function (line, i) {
                    if (i >= startLine && i <= endLine && line.startsWith(tabCharacter)) {
                      return line.substring(tabCharacter.length);
                    }

                    return line;
                  }).join('\n');

                  if (value !== nextValue) {
                    var startLineText = linesBeforeCaret[startLine];

                    _this._applyEdits({
                      value: nextValue,
                      // Move the start cursor if first line in selection was modified
                      // It was modified only if it started with a tab
                      selectionStart: startLineText.startsWith(tabCharacter) ? selectionStart - tabCharacter.length : selectionStart,
                      // Move the end cursor by total number of characters removed
                      selectionEnd: selectionEnd - (value.length - nextValue.length)
                    });
                  }
                } else if (selectionStart !== selectionEnd) {
                  // Indent selected lines
                  var _linesBeforeCaret = _this._getLines(value, selectionStart);

                  var _startLine = _linesBeforeCaret.length - 1;

                  var _endLine = _this._getLines(value, selectionEnd).length - 1;

                  var _startLineText = _linesBeforeCaret[_startLine];

                  _this._applyEdits({
                    value: value.split('\n').map(function (line, i) {
                      if (i >= _startLine && i <= _endLine) {
                        return tabCharacter + line;
                      }

                      return line;
                    }).join('\n'),
                    // Move the start cursor by number of characters added in first line of selection
                    // Don't move it if it there was no text before cursor
                    selectionStart: /\S/.test(_startLineText) ? selectionStart + tabCharacter.length : selectionStart,
                    // Move the end cursor by total number of characters added
                    selectionEnd: selectionEnd + tabCharacter.length * (_endLine - _startLine + 1)
                  });
                } else {
                  var updatedSelection = selectionStart + tabCharacter.length;

                  _this._applyEdits({
                    // Insert tab character at caret
                    value: value.substring(0, selectionStart) + tabCharacter + value.substring(selectionEnd),
                    // Update caret position
                    selectionStart: updatedSelection,
                    selectionEnd: updatedSelection
                  });
                }
              } else if (e.keyCode === KEYCODE_BACKSPACE) {
                var hasSelection = selectionStart !== selectionEnd;
                var textBeforeCaret = value.substring(0, selectionStart);

                if (textBeforeCaret.endsWith(tabCharacter) && !hasSelection) {
                  // Prevent default delete behaviour
                  e.preventDefault();

                  var _updatedSelection = selectionStart - tabCharacter.length;

                  _this._applyEdits({
                    // Remove tab character at caret
                    value: value.substring(0, selectionStart - tabCharacter.length) + value.substring(selectionEnd),
                    // Update caret position
                    selectionStart: _updatedSelection,
                    selectionEnd: _updatedSelection
                  });
                }
              } else if (e.keyCode === KEYCODE_ENTER) {
                // Ignore selections
                if (selectionStart === selectionEnd) {
                  // Get the current line
                  var line = _this._getLines(value, selectionStart).pop();

                  var matches = line.match(/^\s+/);

                  if (matches && matches[0]) {
                    e.preventDefault(); // Preserve indentation on inserting a new line

                    var indent = '\n' + matches[0];

                    var _updatedSelection2 = selectionStart + indent.length;

                    _this._applyEdits({
                      // Insert indentation character at caret
                      value: value.substring(0, selectionStart) + indent + value.substring(selectionEnd),
                      // Update caret position
                      selectionStart: _updatedSelection2,
                      selectionEnd: _updatedSelection2
                    });
                  }
                }
              } else if (e.keyCode === KEYCODE_PARENS || e.keyCode === KEYCODE_BRACKETS || e.keyCode === KEYCODE_QUOTE || e.keyCode === KEYCODE_BACK_QUOTE) {
                var chars = void 0;

                if (e.keyCode === KEYCODE_PARENS && e.shiftKey) {
                  chars = ['(', ')'];
                } else if (e.keyCode === KEYCODE_BRACKETS) {
                  if (e.shiftKey) {
                    chars = ['{', '}'];
                  } else {
                    chars = ['[', ']'];
                  }
                } else if (e.keyCode === KEYCODE_QUOTE) {
                  if (e.shiftKey) {
                    chars = ['"', '"'];
                  } else {
                    chars = ["'", "'"];
                  }
                } else if (e.keyCode === KEYCODE_BACK_QUOTE && !e.shiftKey) {
                  chars = ['`', '`'];
                } // If text is selected, wrap them in the characters


                if (selectionStart !== selectionEnd && chars) {
                  e.preventDefault();

                  _this._applyEdits({
                    value: value.substring(0, selectionStart) + chars[0] + value.substring(selectionStart, selectionEnd) + chars[1] + value.substring(selectionEnd),
                    // Update caret position
                    selectionStart: selectionStart,
                    selectionEnd: selectionEnd + 2
                  });
                }
              } else if ((isMacLike ? // Trigger undo with ⌘+Z on Mac
              e.metaKey && e.keyCode === KEYCODE_Z : // Trigger undo with Ctrl+Z on other platforms
              e.ctrlKey && e.keyCode === KEYCODE_Z) && !e.shiftKey && !e.altKey) {
                e.preventDefault();

                _this._undoEdit();
              } else if ((isMacLike ? // Trigger redo with ⌘+Shift+Z on Mac
              e.metaKey && e.keyCode === KEYCODE_Z && e.shiftKey : isWindows ? // Trigger redo with Ctrl+Y on Windows
              e.ctrlKey && e.keyCode === KEYCODE_Y : // Trigger redo with Ctrl+Shift+Z on other platforms
              e.ctrlKey && e.keyCode === KEYCODE_Z && e.shiftKey) && !e.altKey) {
                e.preventDefault();

                _this._redoEdit();
              } else if (e.keyCode === KEYCODE_M && e.ctrlKey && (isMacLike ? e.shiftKey : true)) {
                e.preventDefault(); // Toggle capturing tab key so users can focus away

                _this.setState(function (state) {
                  return {
                    capture: !state.capture
                  };
                });
              }
            }, _this._handleChange = function (e) {
              var _e$target2 = e.target,
                  value = _e$target2.value,
                  selectionStart = _e$target2.selectionStart,
                  selectionEnd = _e$target2.selectionEnd;

              _this._recordChange({
                value: value,
                selectionStart: selectionStart,
                selectionEnd: selectionEnd
              }, true);

              _this.props.onValueChange(value);
            }, _this._history = {
              stack: [],
              offset: -1
            }, _temp), _possibleConstructorReturn(_this, _ret);
          }

          _createClass(Editor, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
              this._recordCurrentState();
            }
          }, {
            key: 'render',
            value: function render() {
              var _this2 = this;

              var _props = this.props,
                  value = _props.value,
                  style = _props.style,
                  padding = _props.padding,
                  highlight = _props.highlight,
                  textareaId = _props.textareaId,
                  textareaClassName = _props.textareaClassName,
                  autoFocus = _props.autoFocus,
                  disabled = _props.disabled,
                  form = _props.form,
                  maxLength = _props.maxLength,
                  minLength = _props.minLength,
                  name = _props.name,
                  placeholder = _props.placeholder,
                  readOnly = _props.readOnly,
                  required = _props.required,
                  onClick = _props.onClick,
                  onFocus = _props.onFocus,
                  onBlur = _props.onBlur,
                  onKeyUp = _props.onKeyUp,
                  onKeyDown = _props.onKeyDown,
                  onValueChange = _props.onValueChange,
                  tabSize = _props.tabSize,
                  insertSpaces = _props.insertSpaces,
                  ignoreTabKey = _props.ignoreTabKey,
                  preClassName = _props.preClassName,
                  rest = _objectWithoutProperties(_props, ['value', 'style', 'padding', 'highlight', 'textareaId', 'textareaClassName', 'autoFocus', 'disabled', 'form', 'maxLength', 'minLength', 'name', 'placeholder', 'readOnly', 'required', 'onClick', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown', 'onValueChange', 'tabSize', 'insertSpaces', 'ignoreTabKey', 'preClassName']);

              var contentStyle = {
                paddingTop: padding,
                paddingRight: padding,
                paddingBottom: padding,
                paddingLeft: padding
              };
              var highlighted = highlight(value);
              return React$1.createElement('div', _extends({}, rest, {
                style: _extends({}, styles.container, style)
              }), React$1.createElement('textarea', {
                ref: function ref(c) {
                  return _this2._input = c;
                },
                style: _extends({}, styles.editor, styles.textarea, contentStyle),
                className: className + (textareaClassName ? ' ' + textareaClassName : ''),
                id: textareaId,
                value: value,
                onChange: this._handleChange,
                onKeyDown: this._handleKeyDown,
                onClick: onClick,
                onKeyUp: onKeyUp,
                onFocus: onFocus,
                onBlur: onBlur,
                disabled: disabled,
                form: form,
                maxLength: maxLength,
                minLength: minLength,
                name: name,
                placeholder: placeholder,
                readOnly: readOnly,
                required: required,
                autoFocus: autoFocus,
                autoCapitalize: 'off',
                autoComplete: 'off',
                autoCorrect: 'off',
                spellCheck: false,
                'data-gramm': false
              }), React$1.createElement('pre', _extends({
                className: preClassName,
                'aria-hidden': 'true',
                style: _extends({}, styles.editor, styles.highlight, contentStyle)
              }, typeof highlighted === 'string' ? {
                dangerouslySetInnerHTML: {
                  __html: highlighted + '<br />'
                }
              } : {
                children: highlighted
              })), React$1.createElement('style', {
                type: 'text/css',
                dangerouslySetInnerHTML: {
                  __html: cssText
                }
              }));
            }
          }, {
            key: 'session',
            get: function get() {
              return {
                history: this._history
              };
            },
            set: function set(session) {
              this._history = session.history;
            }
          }]);

          return Editor;
        }(React$1.Component);

        Editor.defaultProps = {
          tabSize: 2,
          insertSpaces: true,
          ignoreTabKey: false,
          padding: 0
        };
        exports.default = Editor;
        var styles = {
          container: {
            position: 'relative',
            textAlign: 'left',
            boxSizing: 'border-box',
            padding: 0,
            overflow: 'hidden'
          },
          textarea: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            resize: 'none',
            color: 'inherit',
            overflow: 'hidden',
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            WebkitTextFillColor: 'transparent'
          },
          highlight: {
            position: 'relative',
            pointerEvents: 'none'
          },
          editor: {
            margin: 0,
            border: 0,
            background: 'none',
            boxSizing: 'inherit',
            display: 'inherit',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontStyle: 'inherit',
            fontVariantLigatures: 'inherit',
            fontWeight: 'inherit',
            letterSpacing: 'inherit',
            lineHeight: 'inherit',
            tabSize: 'inherit',
            textIndent: 'inherit',
            textRendering: 'inherit',
            textTransform: 'inherit',
            whiteSpace: 'pre-wrap',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word'
          }
        };
        module.exports = exports.default;
        module.exports.default = exports.default;
      });

      function n(n) {
        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; e < t; e++) r[e - 1] = arguments[e];

        if ("production" !== process.env.NODE_ENV) {
          var i = L[n],
              o = i ? "function" == typeof i ? i.apply(null, r) : i : "unknown error nr: " + n;
          throw Error("[Immer] " + o);
        }

        throw Error("[Immer] minified error nr: " + n + (r.length ? " " + r.join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
      }

      function t(n) {
        return !!n && !!n[G];
      }

      function r(n) {
        return !!n && (function (n) {
          if (!n || "object" != typeof n) return !1;
          var t = Object.getPrototypeOf(n);
          return !t || t === Object.prototype;
        }(n) || Array.isArray(n) || !!n[B] || !!n.constructor[B] || c(n) || s(n));
      }

      function i(n, t, r) {
        void 0 === r && (r = !1), 0 === o(n) ? (r ? Object.keys : Q)(n).forEach(function (r) {
          return t(r, n[r], n);
        }) : n.forEach(function (r, e) {
          return t(e, r, n);
        });
      }

      function o(n) {
        var t = n[G];
        return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(n) ? 1 : c(n) ? 2 : s(n) ? 3 : 0;
      }

      function u(n, t) {
        return 2 === o(n) ? n.has(t) : Object.prototype.hasOwnProperty.call(n, t);
      }

      function a(n, t) {
        return 2 === o(n) ? n.get(t) : n[t];
      }

      function f(n, t) {
        return n === t ? 0 !== n || 1 / n == 1 / t : n != n && t != t;
      }

      function c(n) {
        return U && n instanceof Map;
      }

      function s(n) {
        return W && n instanceof Set;
      }

      function v(n) {
        return n.o || n.t;
      }

      function p(t, r) {
        if (void 0 === r && (r = !1), Array.isArray(t)) return t.slice();
        var e = Object.create(Object.getPrototypeOf(t));
        return i(t, function (i) {
          if (i !== G) {
            var o = Object.getOwnPropertyDescriptor(t, i),
                u = o.value;
            o.get && (r || n(1), u = o.get.call(t)), o.enumerable ? e[i] = u : Object.defineProperty(e, i, {
              value: u,
              writable: !0,
              configurable: !0
            });
          }
        }), e;
      }

      function d(n, e) {
        t(n) || h(n) || !r(n) || (o(n) > 1 && (n.set = n.add = n.clear = n.delete = l), Object.freeze(n), e && i(n, function (n, t) {
          return d(t, !0);
        }, !0));
      }

      function l() {
        n(2);
      }

      function h(n) {
        return null == n || "object" != typeof n || Object.isFrozen(n);
      }

      function y(t) {
        var r = V[t];
        return r || n("production" !== process.env.NODE_ENV ? 18 : 19, t), r;
      }

      function m() {
        return "production" === process.env.NODE_ENV || K || n(0), K;
      }

      function _(n, t) {
        t && (y("Patches"), n.u = [], n.s = [], n.v = t);
      }

      function j(n) {
        O(n), n.p.forEach(w), n.p = null;
      }

      function O(n) {
        n === K && (K = n.l);
      }

      function g(n) {
        return K = {
          p: [],
          l: K,
          h: n,
          m: !0,
          _: 0
        };
      }

      function w(n) {
        var t = n[G];
        0 === t.i || 1 === t.i ? t.j() : t.O = !0;
      }

      function S(t, e) {
        e._ = e.p.length;
        var i = e.p[0],
            o = void 0 !== t && t !== i;
        return e.h.g || y("ES5").S(e, t, o), o ? (i[G].P && (j(e), n(4)), r(t) && (t = P(e, t), e.l || A(e, t)), e.u && y("Patches").M(i[G], t, e.u, e.s)) : t = P(e, i, []), j(e), e.u && e.v(e.u, e.s), t !== q ? t : void 0;
      }

      function P(n, t, r) {
        if (h(t)) return t;
        var e = t[G];
        if (!e) return i(t, function (i, o) {
          return M(n, e, t, i, o, r);
        }, !0), t;
        if (e.A !== n) return t;
        if (!e.P) return A(n, e.t, !0), e.t;

        if (!e.I) {
          e.I = !0, e.A._--;
          var o = 4 === e.i || 5 === e.i ? e.o = p(e.k, !0) : e.o;
          i(o, function (t, i) {
            return M(n, e, o, t, i, r);
          }), A(n, o, !1), r && n.u && y("Patches").R(e, r, n.u, n.s);
        }

        return e.o;
      }

      function M(e, i, c, s, v, p) {
        if ("production" !== process.env.NODE_ENV && v === c && n(5), t(v)) {
          var d = P(e, v, p && i && 3 !== i.i && !u(i.D, s) ? p.concat(s) : void 0);
          if (h = s, y = d, 2 === (b = o(l = c)) ? l.set(h, y) : 3 === b ? (l.delete(h), l.add(y)) : l[h] = y, !t(d)) return;
          e.m = !1;
        }

        var l, h, y, b;

        if ((!i || !f(v, a(i.t, s))) && r(v)) {
          if (!e.h.N && e._ < 1) return;
          P(e, v), i && i.A.l || A(e, v);
        }
      }

      function A(n, t, r) {
        void 0 === r && (r = !1), n.h.N && n.m && d(t, r);
      }

      function x(n, t) {
        var r = n[G],
            e = Reflect.getOwnPropertyDescriptor(r ? v(r) : n, t);
        return e && e.value;
      }

      function z(n) {
        if (!n.P) {
          if (n.P = !0, 0 === n.i || 1 === n.i) {
            var t = n.o = p(n.t);
            i(n.p, function (n, r) {
              t[n] = r;
            }), n.p = void 0;
          }

          n.l && z(n.l);
        }
      }

      function I(n) {
        n.o || (n.o = p(n.t));
      }

      function E(n, t, r) {
        var e = c(t) ? y("MapSet").T(t, r) : s(t) ? y("MapSet").F(t, r) : n.g ? function (n, t) {
          var r = Array.isArray(n),
              e = {
            i: r ? 1 : 0,
            A: t ? t.A : m(),
            P: !1,
            I: !1,
            D: {},
            l: t,
            t: n,
            k: null,
            p: {},
            o: null,
            j: null,
            C: !1
          },
              i = e,
              o = Y;
          r && (i = [e], o = Z);
          var u = Proxy.revocable(i, o),
              a = u.revoke,
              f = u.proxy;
          return e.k = f, e.j = a, f;
        }(t, r) : y("ES5").J(t, r);
        return (r ? r.A : m()).p.push(e), e;
      }

      var J,
          K,
          $ = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"),
          U = "undefined" != typeof Map,
          W = "undefined" != typeof Set,
          X = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
          q = $ ? Symbol("immer-nothing") : ((J = {})["immer-nothing"] = !0, J),
          B = $ ? Symbol("immer-draftable") : "__$immer_draftable",
          G = $ ? Symbol("immer-state") : "__$immer_state",
          L = {
        0: "Illegal state",
        1: "Immer drafts cannot have computed properties",
        2: "This object has been frozen and should not be mutated",
        3: function (n) {
          return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n;
        },
        4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
        5: "Immer forbids circular references",
        6: "The first or second argument to `produce` must be a function",
        7: "The third argument to `produce` must be a function or undefined",
        8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
        9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
        10: "The given draft is already finalized",
        11: "Object.defineProperty() cannot be used on an Immer draft",
        12: "Object.setPrototypeOf() cannot be used on an Immer draft",
        13: "Immer only supports deleting array indices",
        14: "Immer only supports setting array indices and the 'length' property",
        15: function (n) {
          return "Cannot apply patch, path doesn't resolve: " + n;
        },
        16: 'Sets cannot have "replace" patches.',
        17: function (n) {
          return "Unsupported patch operation: " + n;
        },
        18: function (n) {
          return "The plugin for '" + n + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n + "()` when initializing your application.";
        },
        19: function (n) {
          return "plugin not loaded: " + n;
        },
        20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available"
      },
          Q = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
        return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
      } : Object.getOwnPropertyNames,
          V = {},
          Y = {
        get: function (n, t) {
          if (t === G) return n;
          var e = n.p;
          if (!n.P && u(e, t)) return e[t];
          var i = v(n)[t];
          if (n.I || !r(i)) return i;

          if (n.P) {
            if (i !== x(n.t, t)) return i;
            e = n.o;
          }

          return e[t] = E(n.A.h, i, n);
        },
        has: function (n, t) {
          return t in v(n);
        },
        ownKeys: function (n) {
          return Reflect.ownKeys(v(n));
        },
        set: function (n, t, r) {
          if (!n.P) {
            var e = x(n.t, t);
            if (r ? f(e, r) || r === n.p[t] : f(e, r) && t in n.t) return !0;
            I(n), z(n);
          }

          return n.D[t] = !0, n.o[t] = r, !0;
        },
        deleteProperty: function (n, t) {
          return void 0 !== x(n.t, t) || t in n.t ? (n.D[t] = !1, I(n), z(n)) : n.D[t] && delete n.D[t], n.o && delete n.o[t], !0;
        },
        getOwnPropertyDescriptor: function (n, t) {
          var r = v(n),
              e = Reflect.getOwnPropertyDescriptor(r, t);
          return e && (e.writable = !0, e.configurable = 1 !== n.i || "length" !== t), e;
        },
        defineProperty: function () {
          n(11);
        },
        getPrototypeOf: function (n) {
          return Object.getPrototypeOf(n.t);
        },
        setPrototypeOf: function () {
          n(12);
        }
      },
          Z = {};
      i(Y, function (n, t) {
        Z[n] = function () {
          return arguments[0] = arguments[0][0], t.apply(this, arguments);
        };
      }), Z.deleteProperty = function (t, r) {
        return "production" !== process.env.NODE_ENV && isNaN(parseInt(r)) && n(13), Y.deleteProperty.call(this, t[0], r);
      }, Z.set = function (t, r, e) {
        return "production" !== process.env.NODE_ENV && "length" !== r && isNaN(parseInt(r)) && n(14), Y.set.call(this, t[0], r, e, t[0]);
      };

      var nn = function () {
        function e(n) {
          this.g = X, this.N = "production" !== process.env.NODE_ENV, "boolean" == typeof (null == n ? void 0 : n.useProxies) && this.setUseProxies(n.useProxies), "boolean" == typeof (null == n ? void 0 : n.autoFreeze) && this.setAutoFreeze(n.autoFreeze), this.produce = this.produce.bind(this), this.produceWithPatches = this.produceWithPatches.bind(this);
        }

        var i = e.prototype;
        return i.produce = function (t, e, i) {
          if ("function" == typeof t && "function" != typeof e) {
            var o = e;
            e = t;
            var u = this;
            return function (n) {
              var t = this;
              void 0 === n && (n = o);

              for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) i[a - 1] = arguments[a];

              return u.produce(n, function (n) {
                var r;
                return (r = e).call.apply(r, [t, n].concat(i));
              });
            };
          }

          var a;

          if ("function" != typeof e && n(6), void 0 !== i && "function" != typeof i && n(7), r(t)) {
            var f = g(this),
                c = E(this, t, void 0),
                s = !0;

            try {
              a = e(c), s = !1;
            } finally {
              s ? j(f) : O(f);
            }

            return "undefined" != typeof Promise && a instanceof Promise ? a.then(function (n) {
              return _(f, i), S(n, f);
            }, function (n) {
              throw j(f), n;
            }) : (_(f, i), S(a, f));
          }

          if ((a = e(t)) !== q) return void 0 === a && (a = t), this.N && d(a, !0), a;
        }, i.produceWithPatches = function (n, t) {
          var r,
              e,
              i = this;
          return "function" == typeof n ? function (t) {
            for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) e[o - 1] = arguments[o];

            return i.produceWithPatches(t, function (t) {
              return n.apply(void 0, [t].concat(e));
            });
          } : [this.produce(n, t, function (n, t) {
            r = n, e = t;
          }), r, e];
        }, i.createDraft = function (t) {
          r(t) || n(8);
          var e = g(this),
              i = E(this, t, void 0);
          return i[G].C = !0, O(e), i;
        }, i.finishDraft = function (t, r) {
          var e = t && t[G];
          "production" !== process.env.NODE_ENV && (e && e.C || n(9), e.I && n(10));
          var i = e.A;
          return _(i, r), S(void 0, i);
        }, i.setAutoFreeze = function (n) {
          this.N = n;
        }, i.setUseProxies = function (t) {
          X || n(20), this.g = t;
        }, i.applyPatches = function (n, r) {
          var e;

          for (e = r.length - 1; e >= 0; e--) {
            var i = r[e];

            if (0 === i.path.length && "replace" === i.op) {
              n = i.value;
              break;
            }
          }

          var o = y("Patches").U;
          return t(n) ? o(n, r) : this.produce(n, function (n) {
            return o(n, r.slice(e + 1));
          });
        }, e;
      }(),
          tn = new nn(),
          rn = tn.produce,
          en = tn.produceWithPatches.bind(tn),
          on = tn.setAutoFreeze.bind(tn),
          un = tn.setUseProxies.bind(tn),
          an = tn.applyPatches.bind(tn),
          fn = tn.createDraft.bind(tn),
          cn = tn.finishDraft.bind(tn);

      function u$1(t) {
        var i = useState(t),
            u = i[1];
        return [i[0], useCallback(function (n) {
          u(rn(n));
        }, [])];
      }

      var components_1 = createCommonjsModule(function (module) {
        var components = {
          "core": {
            "meta": {
              "path": "components/prism-core.js",
              "option": "mandatory"
            },
            "core": "Core"
          },
          "themes": {
            "meta": {
              "path": "themes/{id}.css",
              "link": "index.html?theme={id}",
              "exclusive": true
            },
            "prism": {
              "title": "Default",
              "option": "default"
            },
            "prism-dark": "Dark",
            "prism-funky": "Funky",
            "prism-okaidia": {
              "title": "Okaidia",
              "owner": "ocodia"
            },
            "prism-twilight": {
              "title": "Twilight",
              "owner": "remybach"
            },
            "prism-coy": {
              "title": "Coy",
              "owner": "tshedor"
            },
            "prism-solarizedlight": {
              "title": "Solarized Light",
              "owner": "hectormatos2011 "
            },
            "prism-tomorrow": {
              "title": "Tomorrow Night",
              "owner": "Rosey"
            }
          },
          "languages": {
            "meta": {
              "path": "components/prism-{id}",
              "noCSS": true,
              "examplesPath": "examples/prism-{id}",
              "addCheckAll": true
            },
            "markup": {
              "title": "Markup",
              "alias": ["html", "xml", "svg", "mathml"],
              "aliasTitles": {
                "html": "HTML",
                "xml": "XML",
                "svg": "SVG",
                "mathml": "MathML"
              },
              "option": "default"
            },
            "css": {
              "title": "CSS",
              "option": "default",
              "modify": "markup"
            },
            "clike": {
              "title": "C-like",
              "option": "default"
            },
            "javascript": {
              "title": "JavaScript",
              "require": "clike",
              "modify": "markup",
              "alias": "js",
              "option": "default"
            },
            "abap": {
              "title": "ABAP",
              "owner": "dellagustin"
            },
            "abnf": {
              "title": "Augmented Backus–Naur form",
              "owner": "RunDevelopment"
            },
            "actionscript": {
              "title": "ActionScript",
              "require": "javascript",
              "modify": "markup",
              "owner": "Golmote"
            },
            "ada": {
              "title": "Ada",
              "owner": "Lucretia"
            },
            "antlr4": {
              "title": "ANTLR4",
              "alias": "g4",
              "owner": "RunDevelopment"
            },
            "apacheconf": {
              "title": "Apache Configuration",
              "owner": "GuiTeK"
            },
            "apl": {
              "title": "APL",
              "owner": "ngn"
            },
            "applescript": {
              "title": "AppleScript",
              "owner": "Golmote"
            },
            "aql": {
              "title": "AQL",
              "owner": "RunDevelopment"
            },
            "arduino": {
              "title": "Arduino",
              "require": "cpp",
              "owner": "eisbehr-"
            },
            "arff": {
              "title": "ARFF",
              "owner": "Golmote"
            },
            "asciidoc": {
              "alias": "adoc",
              "title": "AsciiDoc",
              "owner": "Golmote"
            },
            "asm6502": {
              "title": "6502 Assembly",
              "owner": "kzurawel"
            },
            "aspnet": {
              "title": "ASP.NET (C#)",
              "require": ["markup", "csharp"],
              "owner": "nauzilus"
            },
            "autohotkey": {
              "title": "AutoHotkey",
              "owner": "aviaryan"
            },
            "autoit": {
              "title": "AutoIt",
              "owner": "Golmote"
            },
            "bash": {
              "title": "Bash",
              "alias": "shell",
              "aliasTitles": {
                "shell": "Shell"
              },
              "owner": "zeitgeist87"
            },
            "basic": {
              "title": "BASIC",
              "owner": "Golmote"
            },
            "batch": {
              "title": "Batch",
              "owner": "Golmote"
            },
            "bbcode": {
              "title": "BBcode",
              "alias": "shortcode",
              "aliasTitles": {
                "shortcode": "Shortcode"
              },
              "owner": "RunDevelopment"
            },
            "bison": {
              "title": "Bison",
              "require": "c",
              "owner": "Golmote"
            },
            "bnf": {
              "title": "Backus–Naur form",
              "alias": "rbnf",
              "aliasTitles": {
                "rbnf": "Routing Backus–Naur form"
              },
              "owner": "RunDevelopment"
            },
            "brainfuck": {
              "title": "Brainfuck",
              "owner": "Golmote"
            },
            "brightscript": {
              "title": "BrightScript",
              "owner": "RunDevelopment"
            },
            "bro": {
              "title": "Bro",
              "owner": "wayward710"
            },
            "c": {
              "title": "C",
              "require": "clike",
              "owner": "zeitgeist87"
            },
            "concurnas": {
              "title": "Concurnas",
              "alias": "conc",
              "owner": "jasontatton"
            },
            "csharp": {
              "title": "C#",
              "require": "clike",
              "alias": ["cs", "dotnet"],
              "owner": "mvalipour"
            },
            "cpp": {
              "title": "C++",
              "require": "c",
              "owner": "zeitgeist87"
            },
            "cil": {
              "title": "CIL",
              "owner": "sbrl"
            },
            "coffeescript": {
              "title": "CoffeeScript",
              "require": "javascript",
              "alias": "coffee",
              "owner": "R-osey"
            },
            "cmake": {
              "title": "CMake",
              "owner": "mjrogozinski"
            },
            "clojure": {
              "title": "Clojure",
              "owner": "troglotit"
            },
            "crystal": {
              "title": "Crystal",
              "require": "ruby",
              "owner": "MakeNowJust"
            },
            "csp": {
              "title": "Content-Security-Policy",
              "owner": "ScottHelme"
            },
            "css-extras": {
              "title": "CSS Extras",
              "require": "css",
              "modify": "css",
              "owner": "milesj"
            },
            "d": {
              "title": "D",
              "require": "clike",
              "owner": "Golmote"
            },
            "dart": {
              "title": "Dart",
              "require": "clike",
              "owner": "Golmote"
            },
            "dax": {
              "title": "DAX",
              "owner": "peterbud"
            },
            "diff": {
              "title": "Diff",
              "owner": "uranusjr"
            },
            "django": {
              "title": "Django/Jinja2",
              "require": "markup-templating",
              "alias": "jinja2",
              "owner": "romanvm"
            },
            "dns-zone-file": {
              "title": "DNS zone file",
              "owner": "RunDevelopment",
              "alias": "dns-zone"
            },
            "docker": {
              "title": "Docker",
              "alias": "dockerfile",
              "owner": "JustinBeckwith"
            },
            "ebnf": {
              "title": "Extended Backus–Naur form",
              "owner": "RunDevelopment"
            },
            "eiffel": {
              "title": "Eiffel",
              "owner": "Conaclos"
            },
            "ejs": {
              "title": "EJS",
              "require": ["javascript", "markup-templating"],
              "owner": "RunDevelopment"
            },
            "elixir": {
              "title": "Elixir",
              "owner": "Golmote"
            },
            "elm": {
              "title": "Elm",
              "owner": "zwilias"
            },
            "etlua": {
              "title": "Embedded Lua templating",
              "require": ["lua", "markup-templating"],
              "owner": "RunDevelopment"
            },
            "erb": {
              "title": "ERB",
              "require": ["ruby", "markup-templating"],
              "owner": "Golmote"
            },
            "erlang": {
              "title": "Erlang",
              "owner": "Golmote"
            },
            "excel-formula": {
              "title": "Excel Formula",
              "alias": ["xlsx", "xls"],
              "owner": "RunDevelopment"
            },
            "fsharp": {
              "title": "F#",
              "require": "clike",
              "owner": "simonreynolds7"
            },
            "factor": {
              "title": "Factor",
              "owner": "catb0t"
            },
            "firestore-security-rules": {
              "title": "Firestore security rules",
              "require": "clike",
              "owner": "RunDevelopment"
            },
            "flow": {
              "title": "Flow",
              "require": "javascript",
              "owner": "Golmote"
            },
            "fortran": {
              "title": "Fortran",
              "owner": "Golmote"
            },
            "ftl": {
              "title": "FreeMarker Template Language",
              "require": "markup-templating",
              "owner": "RunDevelopment"
            },
            "gcode": {
              "title": "G-code",
              "owner": "RunDevelopment"
            },
            "gdscript": {
              "title": "GDScript",
              "owner": "RunDevelopment"
            },
            "gedcom": {
              "title": "GEDCOM",
              "owner": "Golmote"
            },
            "gherkin": {
              "title": "Gherkin",
              "owner": "hason"
            },
            "git": {
              "title": "Git",
              "owner": "lgiraudel"
            },
            "glsl": {
              "title": "GLSL",
              "require": "clike",
              "owner": "Golmote"
            },
            "gml": {
              "title": "GameMaker Language",
              "alias": "gamemakerlanguage",
              "require": "clike",
              "owner": "LiarOnce"
            },
            "go": {
              "title": "Go",
              "require": "clike",
              "owner": "arnehormann"
            },
            "graphql": {
              "title": "GraphQL",
              "owner": "Golmote"
            },
            "groovy": {
              "title": "Groovy",
              "require": "clike",
              "owner": "robfletcher"
            },
            "haml": {
              "title": "Haml",
              "require": "ruby",
              "optional": ["css", "css-extras", "coffeescript", "erb", "javascript", "less", "markdown", "scss", "textile"],
              "owner": "Golmote"
            },
            "handlebars": {
              "title": "Handlebars",
              "require": "markup-templating",
              "owner": "Golmote"
            },
            "haskell": {
              "title": "Haskell",
              "alias": "hs",
              "owner": "bholst"
            },
            "haxe": {
              "title": "Haxe",
              "require": "clike",
              "owner": "Golmote"
            },
            "hcl": {
              "title": "HCL",
              "owner": "outsideris"
            },
            "http": {
              "title": "HTTP",
              "optional": ["css", "javascript", "json", "markup"],
              "owner": "danielgtaylor"
            },
            "hpkp": {
              "title": "HTTP Public-Key-Pins",
              "owner": "ScottHelme"
            },
            "hsts": {
              "title": "HTTP Strict-Transport-Security",
              "owner": "ScottHelme"
            },
            "ichigojam": {
              "title": "IchigoJam",
              "owner": "BlueCocoa"
            },
            "icon": {
              "title": "Icon",
              "owner": "Golmote"
            },
            "inform7": {
              "title": "Inform 7",
              "owner": "Golmote"
            },
            "ini": {
              "title": "Ini",
              "owner": "aviaryan"
            },
            "io": {
              "title": "Io",
              "owner": "AlesTsurko"
            },
            "j": {
              "title": "J",
              "owner": "Golmote"
            },
            "java": {
              "title": "Java",
              "require": "clike",
              "owner": "sherblot"
            },
            "javadoc": {
              "title": "JavaDoc",
              "require": ["markup", "java", "javadoclike"],
              "modify": "java",
              "optional": "scala",
              "owner": "RunDevelopment"
            },
            "javadoclike": {
              "title": "JavaDoc-like",
              "modify": ["java", "javascript", "php"],
              "owner": "RunDevelopment"
            },
            "javastacktrace": {
              "title": "Java stack trace",
              "owner": "RunDevelopment"
            },
            "jolie": {
              "title": "Jolie",
              "require": "clike",
              "owner": "thesave"
            },
            "jq": {
              "title": "JQ",
              "owner": "RunDevelopment"
            },
            "jsdoc": {
              "title": "JSDoc",
              "require": ["javascript", "javadoclike"],
              "modify": "javascript",
              "optional": ["actionscript", "coffeescript"],
              "owner": "RunDevelopment"
            },
            "js-extras": {
              "title": "JS Extras",
              "require": "javascript",
              "modify": "javascript",
              "optional": ["actionscript", "coffeescript", "flow", "n4js", "typescript"],
              "owner": "RunDevelopment"
            },
            "js-templates": {
              "title": "JS Templates",
              "require": "javascript",
              "modify": "javascript",
              "optional": ["css", "css-extras", "graphql", "markdown", "markup"],
              "owner": "RunDevelopment"
            },
            "json": {
              "title": "JSON",
              "owner": "CupOfTea696"
            },
            "jsonp": {
              "title": "JSONP",
              "require": "json",
              "owner": "RunDevelopment"
            },
            "json5": {
              "title": "JSON5",
              "require": "json",
              "owner": "RunDevelopment"
            },
            "julia": {
              "title": "Julia",
              "owner": "cdagnino"
            },
            "keyman": {
              "title": "Keyman",
              "owner": "mcdurdin"
            },
            "kotlin": {
              "title": "Kotlin",
              "require": "clike",
              "owner": "Golmote"
            },
            "latex": {
              "title": "LaTeX",
              "alias": ["tex", "context"],
              "aliasTitles": {
                "tex": "TeX",
                "context": "ConTeXt"
              },
              "owner": "japborst"
            },
            "latte": {
              "title": "Latte",
              "require": ["clike", "markup-templating", "php"],
              "owner": "nette"
            },
            "less": {
              "title": "Less",
              "require": "css",
              "optional": "css-extras",
              "owner": "Golmote"
            },
            "lilypond": {
              "title": "LilyPond",
              "require": "scheme",
              "alias": "ly",
              "owner": "RunDevelopment"
            },
            "liquid": {
              "title": "Liquid",
              "owner": "cinhtau"
            },
            "lisp": {
              "title": "Lisp",
              "alias": ["emacs", "elisp", "emacs-lisp"],
              "owner": "JuanCaicedo"
            },
            "livescript": {
              "title": "LiveScript",
              "owner": "Golmote"
            },
            "llvm": {
              "title": "LLVM IR",
              "owner": "porglezomp"
            },
            "lolcode": {
              "title": "LOLCODE",
              "owner": "Golmote"
            },
            "lua": {
              "title": "Lua",
              "owner": "Golmote"
            },
            "makefile": {
              "title": "Makefile",
              "owner": "Golmote"
            },
            "markdown": {
              "title": "Markdown",
              "require": "markup",
              "alias": "md",
              "owner": "Golmote"
            },
            "markup-templating": {
              "title": "Markup templating",
              "require": "markup",
              "owner": "Golmote"
            },
            "matlab": {
              "title": "MATLAB",
              "owner": "Golmote"
            },
            "mel": {
              "title": "MEL",
              "owner": "Golmote"
            },
            "mizar": {
              "title": "Mizar",
              "owner": "Golmote"
            },
            "monkey": {
              "title": "Monkey",
              "owner": "Golmote"
            },
            "moonscript": {
              "title": "MoonScript",
              "alias": "moon",
              "owner": "RunDevelopment"
            },
            "n1ql": {
              "title": "N1QL",
              "owner": "TMWilds"
            },
            "n4js": {
              "title": "N4JS",
              "require": "javascript",
              "optional": "jsdoc",
              "alias": "n4jsd",
              "owner": "bsmith-n4"
            },
            "nand2tetris-hdl": {
              "title": "Nand To Tetris HDL",
              "owner": "stephanmax"
            },
            "nasm": {
              "title": "NASM",
              "owner": "rbmj"
            },
            "neon": {
              "title": "NEON",
              "owner": "nette"
            },
            "nginx": {
              "title": "nginx",
              "owner": "westonganger",
              "require": "clike"
            },
            "nim": {
              "title": "Nim",
              "owner": "Golmote"
            },
            "nix": {
              "title": "Nix",
              "owner": "Golmote"
            },
            "nsis": {
              "title": "NSIS",
              "owner": "idleberg"
            },
            "objectivec": {
              "title": "Objective-C",
              "require": "c",
              "owner": "uranusjr"
            },
            "ocaml": {
              "title": "OCaml",
              "owner": "Golmote"
            },
            "opencl": {
              "title": "OpenCL",
              "require": "c",
              "modify": ["c", "cpp"],
              "owner": "Milania1"
            },
            "oz": {
              "title": "Oz",
              "owner": "Golmote"
            },
            "parigp": {
              "title": "PARI/GP",
              "owner": "Golmote"
            },
            "parser": {
              "title": "Parser",
              "require": "markup",
              "owner": "Golmote"
            },
            "pascal": {
              "title": "Pascal",
              "alias": "objectpascal",
              "aliasTitles": {
                "objectpascal": "Object Pascal"
              },
              "owner": "Golmote"
            },
            "pascaligo": {
              "title": "Pascaligo",
              "owner": "DefinitelyNotAGoat"
            },
            "pcaxis": {
              "title": "PC-Axis",
              "alias": "px",
              "owner": "RunDevelopment"
            },
            "perl": {
              "title": "Perl",
              "owner": "Golmote"
            },
            "php": {
              "title": "PHP",
              "require": ["clike", "markup-templating"],
              "owner": "milesj"
            },
            "phpdoc": {
              "title": "PHPDoc",
              "require": ["php", "javadoclike"],
              "modify": "php",
              "owner": "RunDevelopment"
            },
            "php-extras": {
              "title": "PHP Extras",
              "require": "php",
              "modify": "php",
              "owner": "milesj"
            },
            "plsql": {
              "title": "PL/SQL",
              "require": "sql",
              "owner": "Golmote"
            },
            "powerquery": {
              "title": "PowerQuery",
              "alias": ["pq", "mscript"],
              "owner": "peterbud"
            },
            "powershell": {
              "title": "PowerShell",
              "owner": "nauzilus"
            },
            "processing": {
              "title": "Processing",
              "require": "clike",
              "owner": "Golmote"
            },
            "prolog": {
              "title": "Prolog",
              "owner": "Golmote"
            },
            "properties": {
              "title": ".properties",
              "owner": "Golmote"
            },
            "protobuf": {
              "title": "Protocol Buffers",
              "require": "clike",
              "owner": "just-boris"
            },
            "pug": {
              "title": "Pug",
              "require": ["markup", "javascript"],
              "optional": ["coffeescript", "ejs", "handlebars", "less", "livescript", "markdown", "scss", "stylus", "twig"],
              "owner": "Golmote"
            },
            "puppet": {
              "title": "Puppet",
              "owner": "Golmote"
            },
            "pure": {
              "title": "Pure",
              "optional": ["c", "cpp", "fortran"],
              "owner": "Golmote"
            },
            "python": {
              "title": "Python",
              "alias": "py",
              "owner": "multipetros"
            },
            "q": {
              "title": "Q (kdb+ database)",
              "owner": "Golmote"
            },
            "qml": {
              "title": "QML",
              "require": "javascript",
              "owner": "RunDevelopment"
            },
            "qore": {
              "title": "Qore",
              "require": "clike",
              "owner": "temnroegg"
            },
            "r": {
              "title": "R",
              "owner": "Golmote"
            },
            "jsx": {
              "title": "React JSX",
              "require": ["markup", "javascript"],
              "optional": ["jsdoc", "js-extras", "js-templates"],
              "owner": "vkbansal"
            },
            "tsx": {
              "title": "React TSX",
              "require": ["jsx", "typescript"]
            },
            "renpy": {
              "title": "Ren'py",
              "owner": "HyuchiaDiego"
            },
            "reason": {
              "title": "Reason",
              "require": "clike",
              "owner": "Golmote"
            },
            "regex": {
              "title": "Regex",
              "modify": ["actionscript", "coffeescript", "flow", "javascript", "typescript", "vala"],
              "owner": "RunDevelopment"
            },
            "rest": {
              "title": "reST (reStructuredText)",
              "owner": "Golmote"
            },
            "rip": {
              "title": "Rip",
              "owner": "ravinggenius"
            },
            "roboconf": {
              "title": "Roboconf",
              "owner": "Golmote"
            },
            "robotframework": {
              "title": "Robot Framework",
              "alias": "robot",
              "owner": "RunDevelopment"
            },
            "ruby": {
              "title": "Ruby",
              "require": "clike",
              "alias": "rb",
              "owner": "samflores"
            },
            "rust": {
              "title": "Rust",
              "owner": "Golmote"
            },
            "sas": {
              "title": "SAS",
              "optional": ["groovy", "lua", "sql"],
              "owner": "Golmote"
            },
            "sass": {
              "title": "Sass (Sass)",
              "require": "css",
              "owner": "Golmote"
            },
            "scss": {
              "title": "Sass (Scss)",
              "require": "css",
              "optional": "css-extras",
              "owner": "MoOx"
            },
            "scala": {
              "title": "Scala",
              "require": "java",
              "owner": "jozic"
            },
            "scheme": {
              "title": "Scheme",
              "owner": "bacchus123"
            },
            "shell-session": {
              "title": "Shell session",
              "require": "bash",
              "owner": "RunDevelopment"
            },
            "smalltalk": {
              "title": "Smalltalk",
              "owner": "Golmote"
            },
            "smarty": {
              "title": "Smarty",
              "require": "markup-templating",
              "owner": "Golmote"
            },
            "solidity": {
              "title": "Solidity (Ethereum)",
              "require": "clike",
              "owner": "glachaud"
            },
            "solution-file": {
              "title": "Solution file",
              "alias": "sln",
              "owner": "RunDevelopment"
            },
            "soy": {
              "title": "Soy (Closure Template)",
              "require": "markup-templating",
              "owner": "Golmote"
            },
            "sparql": {
              "title": "SPARQL",
              "require": "turtle",
              "owner": "Triply-Dev",
              "alias": "rq"
            },
            "splunk-spl": {
              "title": "Splunk SPL",
              "owner": "RunDevelopment"
            },
            "sqf": {
              "title": "SQF: Status Quo Function (Arma 3)",
              "require": "clike",
              "owner": "RunDevelopment"
            },
            "sql": {
              "title": "SQL",
              "owner": "multipetros"
            },
            "stylus": {
              "title": "Stylus",
              "owner": "vkbansal"
            },
            "swift": {
              "title": "Swift",
              "require": "clike",
              "owner": "chrischares"
            },
            "tap": {
              "title": "TAP",
              "owner": "isaacs",
              "require": "yaml"
            },
            "tcl": {
              "title": "Tcl",
              "owner": "PeterChaplin"
            },
            "textile": {
              "title": "Textile",
              "require": "markup",
              "optional": "css",
              "owner": "Golmote"
            },
            "toml": {
              "title": "TOML",
              "owner": "RunDevelopment"
            },
            "tt2": {
              "title": "Template Toolkit 2",
              "require": ["clike", "markup-templating"],
              "owner": "gflohr"
            },
            "turtle": {
              "title": "Turtle",
              "alias": "trig",
              "aliasTitles": {
                "trig": "TriG"
              },
              "owner": "jakubklimek"
            },
            "twig": {
              "title": "Twig",
              "require": "markup",
              "owner": "brandonkelly"
            },
            "typescript": {
              "title": "TypeScript",
              "require": "javascript",
              "optional": "js-templates",
              "alias": "ts",
              "owner": "vkbansal"
            },
            "t4-cs": {
              "title": "T4 Text Templates (C#)",
              "require": ["t4-templating", "csharp"],
              "alias": "t4",
              "owner": "RunDevelopment"
            },
            "t4-vb": {
              "title": "T4 Text Templates (VB)",
              "require": ["t4-templating", "visual-basic"],
              "owner": "RunDevelopment"
            },
            "t4-templating": {
              "title": "T4 templating",
              "owner": "RunDevelopment"
            },
            "vala": {
              "title": "Vala",
              "require": "clike",
              "owner": "TemplarVolk"
            },
            "vbnet": {
              "title": "VB.Net",
              "require": "basic",
              "owner": "Bigsby"
            },
            "velocity": {
              "title": "Velocity",
              "require": "markup",
              "owner": "Golmote"
            },
            "verilog": {
              "title": "Verilog",
              "owner": "a-rey"
            },
            "vhdl": {
              "title": "VHDL",
              "owner": "a-rey"
            },
            "vim": {
              "title": "vim",
              "owner": "westonganger"
            },
            "visual-basic": {
              "title": "Visual Basic",
              "alias": "vb",
              "owner": "Golmote"
            },
            "wasm": {
              "title": "WebAssembly",
              "owner": "Golmote"
            },
            "wiki": {
              "title": "Wiki markup",
              "require": "markup",
              "owner": "Golmote"
            },
            "xeora": {
              "title": "Xeora",
              "require": "markup",
              "alias": "xeoracube",
              "aliasTitles": {
                "xeoracube": "XeoraCube"
              },
              "owner": "freakmaxi"
            },
            "xojo": {
              "title": "Xojo (REALbasic)",
              "owner": "Golmote"
            },
            "xquery": {
              "title": "XQuery",
              "require": "markup",
              "owner": "Golmote"
            },
            "yaml": {
              "title": "YAML",
              "alias": "yml",
              "owner": "hason"
            },
            "zig": {
              "title": "Zig",
              "owner": "RunDevelopment"
            }
          },
          "plugins": {
            "meta": {
              "path": "plugins/{id}/prism-{id}",
              "link": "plugins/{id}/"
            },
            "line-highlight": {
              "title": "Line Highlight",
              "description": "Highlights specific lines and/or line ranges."
            },
            "line-numbers": {
              "title": "Line Numbers",
              "description": "Line number at the beginning of code lines.",
              "owner": "kuba-kubula"
            },
            "show-invisibles": {
              "title": "Show Invisibles",
              "description": "Show hidden characters such as tabs and line breaks.",
              "optional": ["autolinker", "data-uri-highlight"]
            },
            "autolinker": {
              "title": "Autolinker",
              "description": "Converts URLs and emails in code to clickable links. Parses Markdown links in comments."
            },
            "wpd": {
              "title": "WebPlatform Docs",
              "description": "Makes tokens link to <a href=\"https://webplatform.github.io/docs/\">WebPlatform.org documentation</a>. The links open in a new tab."
            },
            "custom-class": {
              "title": "Custom Class",
              "description": "This plugin allows you to prefix Prism's default classes (<code>.comment</code> can become <code>.namespace--comment</code>) or replace them with your defined ones (like <code>.editor__comment</code>). You can even add new classes.",
              "owner": "dvkndn",
              "noCSS": true
            },
            "file-highlight": {
              "title": "File Highlight",
              "description": "Fetch external files and highlight them with Prism. Used on the Prism website itself.",
              "noCSS": true
            },
            "show-language": {
              "title": "Show Language",
              "description": "Display the highlighted language in code blocks (inline code does not show the label).",
              "owner": "nauzilus",
              "noCSS": true,
              "require": "toolbar"
            },
            "jsonp-highlight": {
              "title": "JSONP Highlight",
              "description": "Fetch content with JSONP and highlight some interesting content (e.g. GitHub/Gists or Bitbucket API).",
              "noCSS": true,
              "owner": "nauzilus"
            },
            "highlight-keywords": {
              "title": "Highlight Keywords",
              "description": "Adds special CSS classes for each keyword matched in the code. For example, the keyword <code>if</code> will have the class <code>keyword-if</code> as well. You can have fine grained control over the appearance of each keyword by providing your own CSS rules.",
              "owner": "vkbansal",
              "noCSS": true
            },
            "remove-initial-line-feed": {
              "title": "Remove initial line feed",
              "description": "Removes the initial line feed in code blocks.",
              "owner": "Golmote",
              "noCSS": true
            },
            "inline-color": {
              "title": "Inline color",
              "description": "Adds a small inline preview for colors in style sheets.",
              "require": "css-extras",
              "owner": "RunDevelopment"
            },
            "previewers": {
              "title": "Previewers",
              "description": "Previewers for angles, colors, gradients, easing and time.",
              "require": "css-extras",
              "owner": "Golmote"
            },
            "autoloader": {
              "title": "Autoloader",
              "description": "Automatically loads the needed languages to highlight the code blocks.",
              "owner": "Golmote",
              "noCSS": true
            },
            "keep-markup": {
              "title": "Keep Markup",
              "description": "Prevents custom markup from being dropped out during highlighting.",
              "owner": "Golmote",
              "optional": "normalize-whitespace",
              "noCSS": true
            },
            "command-line": {
              "title": "Command Line",
              "description": "Display a command line with a prompt and, optionally, the output/response from the commands.",
              "owner": "chriswells0"
            },
            "unescaped-markup": {
              "title": "Unescaped Markup",
              "description": "Write markup without having to escape anything."
            },
            "normalize-whitespace": {
              "title": "Normalize Whitespace",
              "description": "Supports multiple operations to normalize whitespace in code blocks.",
              "owner": "zeitgeist87",
              "optional": "unescaped-markup",
              "noCSS": true
            },
            "data-uri-highlight": {
              "title": "Data-URI Highlight",
              "description": "Highlights data-URI contents.",
              "owner": "Golmote",
              "noCSS": true
            },
            "toolbar": {
              "title": "Toolbar",
              "description": "Attach a toolbar for plugins to easily register buttons on the top of a code block.",
              "owner": "mAAdhaTTah"
            },
            "copy-to-clipboard": {
              "title": "Copy to Clipboard Button",
              "description": "Add a button that copies the code block to the clipboard when clicked.",
              "owner": "mAAdhaTTah",
              "require": "toolbar",
              "noCSS": true
            },
            "download-button": {
              "title": "Download Button",
              "description": "A button in the toolbar of a code block adding a convenient way to download a code file.",
              "owner": "Golmote",
              "require": "toolbar",
              "noCSS": true
            },
            "match-braces": {
              "title": "Match braces",
              "description": "Highlights matching braces.",
              "owner": "RunDevelopment"
            },
            "diff-highlight": {
              "title": "Diff Highlight",
              "description": "Highlights the code inside diff blocks.",
              "owner": "RunDevelopment",
              "require": "diff"
            },
            "filter-highlight-all": {
              "title": "Filter highlightAll",
              "description": "Filters the elements the <code>highlightAll</code> and <code>highlightAllUnder</code> methods actually highlight.",
              "owner": "RunDevelopment",
              "noCSS": true
            },
            "treeview": {
              "title": "Treeview",
              "description": "A language with special styles to highlight file system tree structures.",
              "owner": "Golmote"
            }
          }
        };

        if ( module.exports) {
          module.exports = components;
        }
      });

      var dependencies = createCommonjsModule(function (module) {
        /**
         * @typedef {Object<string, ComponentCategory>} Components
         * @typedef {Object<string, ComponentEntry | string>} ComponentCategory
         *
         * @typedef ComponentEntry
         * @property {string} [title] The title of the component.
         * @property {string} [owner] The GitHub user name of the owner.
         * @property {boolean} [noCSS=false] Whether the component doesn't have style sheets which should also be loaded.
         * @property {string | string[]} [alias] An optional list of aliases for the id of the component.
         * @property {Object<string, string>} [aliasTitles] An optional map from an alias to its title.
         *
         * Aliases which are not in this map will the get title of the component.
         * @property {string | string[]} [optional]
         * @property {string | string[]} [require]
         * @property {string | string[]} [modify]
         */

        var getLoader = function () {
          /**
           * A function which does absolutely nothing.
           *
           * @type {any}
           */
          var noop = function () {};
          /**
           * Invokes the given callback for all elements of the given value.
           *
           * If the given value is an array, the callback will be invokes for all elements. If the given value is `null` or
           * `undefined`, the callback will not be invoked. In all other cases, the callback will be invoked with the given
           * value as parameter.
           *
           * @param {null | undefined | T | T[]} value
           * @param {(value: T, index: number) => void} callbackFn
           * @returns {void}
           * @template T
           */


          function forEach(value, callbackFn) {
            if (Array.isArray(value)) {
              value.forEach(callbackFn);
            } else if (value != null) {
              callbackFn(value, 0);
            }
          }
          /**
           * Returns a new set for the given string array.
           *
           * @param {string[]} array
           * @returns {StringSet}
           *
           * @typedef {Object<string, true>} StringSet
           */


          function toSet(array) {
            /** @type {StringSet} */
            var set = {};

            for (var i = 0, l = array.length; i < l; i++) {
              set[array[i]] = true;
            }

            return set;
          }
          /**
           * Creates a map of every components id to its entry.
           *
           * @param {Components} components
           * @returns {EntryMap}
           *
           * @typedef {{ readonly [id: string]: Readonly<ComponentEntry> | undefined }} EntryMap
           */


          function createEntryMap(components) {
            /** @type {Object<string, Readonly<ComponentEntry>>} */
            var map = {};

            for (var categoryName in components) {
              var category = components[categoryName];

              for (var id in category) {
                if (id != 'meta') {
                  /** @type {ComponentEntry | string} */
                  var entry = category[id];
                  map[id] = typeof entry == 'string' ? {
                    title: entry
                  } : entry;
                }
              }
            }

            return map;
          }
          /**
           * Creates a full dependencies map which includes all types of dependencies and their transitive dependencies.
           *
           * @param {EntryMap} entryMap
           * @returns {DependencyResolver}
           *
           * @typedef {(id: string) => StringSet} DependencyResolver
           */


          function createDependencyResolver(entryMap) {
            /** @type {Object<string, StringSet>} */
            var map = {};
            var _stackArray = [];
            /**
             * Adds the dependencies of the given component to the dependency map.
             *
             * @param {string} id
             * @param {string[]} stack
             */

            function addToMap(id, stack) {
              if (id in map) {
                return;
              }

              stack.push(id); // check for circular dependencies

              var firstIndex = stack.indexOf(id);

              if (firstIndex < stack.length - 1) {
                throw new Error('Circular dependency: ' + stack.slice(firstIndex).join(' -> '));
              }
              /** @type {StringSet} */


              var dependencies = {};
              var entry = entryMap[id];

              if (entry) {
                /**
                 * This will add the direct dependency and all of its transitive dependencies to the set of
                 * dependencies of `entry`.
                 *
                 * @param {string} depId
                 * @returns {void}
                 */
                function handleDirectDependency(depId) {
                  if (!(depId in entryMap)) {
                    throw new Error(id + ' depends on an unknown component ' + depId);
                  }

                  if (depId in dependencies) {
                    // if the given dependency is already in the set of deps, then so are its transitive deps
                    return;
                  }

                  addToMap(depId, stack);
                  dependencies[depId] = true;

                  for (var transitiveDepId in map[depId]) {
                    dependencies[transitiveDepId] = true;
                  }
                }

                forEach(entry.require, handleDirectDependency);
                forEach(entry.optional, handleDirectDependency);
                forEach(entry.modify, handleDirectDependency);
              }

              map[id] = dependencies;
              stack.pop();
            }

            return function (id) {
              var deps = map[id];

              if (!deps) {
                addToMap(id, _stackArray);
                deps = map[id];
              }

              return deps;
            };
          }
          /**
           * Returns a function which resolves the aliases of its given id of alias.
           *
           * @param {EntryMap} entryMap
           * @returns {(idOrAlias: string) => string}
           */


          function createAliasResolver(entryMap) {
            /** @type {Object<string, string> | undefined} */
            var map;
            return function (idOrAlias) {
              if (idOrAlias in entryMap) {
                return idOrAlias;
              } else {
                // only create the alias map if necessary
                if (!map) {
                  map = {};

                  for (var id in entryMap) {
                    var entry = entryMap[id];
                    forEach(entry && entry.alias, function (alias) {
                      if (alias in map) {
                        throw new Error(alias + ' cannot be alias for both ' + id + ' and ' + map[alias]);
                      }

                      if (alias in entryMap) {
                        throw new Error(alias + ' cannot be alias of ' + id + ' because it is a component.');
                      }

                      map[alias] = id;
                    });
                  }
                }

                return map[idOrAlias] || idOrAlias;
              }
            };
          }
          /**
           * @typedef LoadChainer
           * @property {(before: T, after: () => T) => T} series
           * @property {(values: T[]) => T} parallel
           * @template T
           */

          /**
           * Creates an implicit DAG from the given components and dependencies and call the given `loadComponent` for each
           * component in topological order.
           *
           * @param {DependencyResolver} dependencyResolver
           * @param {StringSet} ids
           * @param {(id: string) => T} loadComponent
           * @param {LoadChainer<T>} [chainer]
           * @returns {T}
           * @template T
           */


          function loadComponentsInOrder(dependencyResolver, ids, loadComponent, chainer) {
            const series = chainer ? chainer.series : undefined;
            const parallel = chainer ? chainer.parallel : noop;
            /** @type {Object<string, T>} */

            var cache = {};
            /**
             * A set of ids of nodes which are not depended upon by any other node in the graph.
             * @type {StringSet}
             */

            var ends = {};
            /**
             * Loads the given component and its dependencies or returns the cached value.
             *
             * @param {string} id
             * @returns {T}
             */

            function handleId(id) {
              if (id in cache) {
                return cache[id];
              } // assume that it's an end
              // if it isn't, it will be removed later


              ends[id] = true; // all dependencies of the component in the given ids

              var dependsOn = [];

              for (var depId in dependencyResolver(id)) {
                if (depId in ids) {
                  dependsOn.push(depId);
                }
              }
              /**
               * The value to be returned.
               * @type {T}
               */


              var value;

              if (dependsOn.length === 0) {
                value = loadComponent(id);
              } else {
                var depsValue = parallel(dependsOn.map(function (depId) {
                  var value = handleId(depId); // none of the dependencies can be ends

                  delete ends[depId];
                  return value;
                }));

                if (series) {
                  // the chainer will be responsibly for calling the function calling loadComponent
                  value = series(depsValue, function () {
                    return loadComponent(id);
                  });
                } else {
                  // we don't have a chainer, so we call loadComponent ourselves
                  loadComponent(id);
                }
              } // cache and return


              return cache[id] = value;
            }

            for (var id in ids) {
              handleId(id);
            }
            /** @type {T[]} */


            var endValues = [];

            for (var endId in ends) {
              endValues.push(cache[endId]);
            }

            return parallel(endValues);
          }
          /**
           * Returns whether the given object has any keys.
           *
           * @param {object} obj
           */


          function hasKeys(obj) {
            for (var key in obj) {
              return true;
            }

            return false;
          }
          /**
           * Returns an object which provides methods to get the ids of the components which have to be loaded (`getIds`) and
           * a way to efficiently load them in synchronously and asynchronous contexts (`load`).
           *
           * The set of ids to be loaded is a superset of `load`. If some of these ids are in `loaded`, the corresponding
           * components will have to reloaded.
           *
           * The ids in `load` and `loaded` may be in any order and can contain duplicates.
           *
           * @param {Components} components
           * @param {string[]} load
           * @param {string[]} [loaded=[]] A list of already loaded components.
           *
           * If a component is in this list, then all of its requirements will also be assumed to be in the list.
           * @returns {Loader}
           *
           * @typedef Loader
           * @property {() => string[]} getIds A function to get all ids of the components to load.
           *
           * The returned ids will be duplicate-free, alias-free and in load order.
           * @property {LoadFunction} load A functional interface to load components.
           *
           * @typedef {<T> (loadComponent: (id: string) => T, chainer?: LoadChainer<T>) => T} LoadFunction
           * A functional interface to load components.
           *
           * The `loadComponent` function will be called for every component in the order in which they have to be loaded.
           *
           * The `chainer` is useful for asynchronous loading and its `series` and `parallel` functions can be thought of as
           * `Promise#then` and `Promise.all`.
           *
           * @example
           * load(id => { loadComponent(id); }); // returns undefined
           *
           * await load(
           *     id => loadComponentAsync(id), // returns a Promise for each id
           *     {
           *         series: async (before, after) => {
           *             await before;
           *             await after();
           *         },
           *         parallel: async (values) => {
           *             await Promise.all(values);
           *         }
           *     }
           * );
           */


          function getLoader(components, load, loaded) {
            var entryMap = createEntryMap(components);
            var resolveAlias = createAliasResolver(entryMap);
            load = load.map(resolveAlias);
            loaded = (loaded || []).map(resolveAlias);
            var loadSet = toSet(load);
            var loadedSet = toSet(loaded); // add requirements

            load.forEach(addRequirements);

            function addRequirements(id) {
              var entry = entryMap[id];
              forEach(entry && entry.require, function (reqId) {
                if (!(reqId in loadedSet)) {
                  loadSet[reqId] = true;
                  addRequirements(reqId);
                }
              });
            } // add components to reload
            // A component x in `loaded` has to be reloaded if
            //  1) a component in `load` modifies x.
            //  2) x depends on a component in `load`.
            // The above two condition have to be applied until nothing changes anymore.


            var dependencyResolver = createDependencyResolver(entryMap);
            /** @type {StringSet} */

            var loadAdditions = loadSet;
            /** @type {StringSet} */

            var newIds;

            while (hasKeys(loadAdditions)) {
              newIds = {}; // condition 1)

              for (var loadId in loadAdditions) {
                var entry = entryMap[loadId];
                forEach(entry && entry.modify, function (modId) {
                  if (modId in loadedSet) {
                    newIds[modId] = true;
                  }
                });
              } // condition 2)


              for (var loadedId in loadedSet) {
                if (!(loadedId in loadSet)) {
                  for (var depId in dependencyResolver(loadedId)) {
                    if (depId in loadSet) {
                      newIds[loadedId] = true;
                      break;
                    }
                  }
                }
              }

              loadAdditions = newIds;

              for (var newId in loadAdditions) {
                loadSet[newId] = true;
              }
            }
            /** @type {Loader} */


            var loader = {
              getIds: function () {
                var ids = [];
                loader.load(function (id) {
                  ids.push(id);
                });
                return ids;
              },
              load: function (loadComponent, chainer) {
                return loadComponentsInOrder(dependencyResolver, loadSet, loadComponent, chainer);
              }
            };
            return loader;
          }

          return getLoader;
        }();

        {
          module.exports = getLoader;
        }
      });

      var prismCore = createCommonjsModule(function (module) {
        var _self = typeof window !== 'undefined' ? window // if in browser
        : typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
        : {} // if in node js
        ;
        /**
         * Prism: Lightweight, robust, elegant syntax highlighting
         * MIT license http://www.opensource.org/licenses/mit-license.php/
         * @author Lea Verou http://lea.verou.me
         */


        var Prism = function (_self) {
          // Private helper vars
          var lang = /\blang(?:uage)?-([\w-]+)\b/i;
          var uniqueId = 0;
          var _ = {
            manual: _self.Prism && _self.Prism.manual,
            disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
            util: {
              encode: function encode(tokens) {
                if (tokens instanceof Token) {
                  return new Token(tokens.type, encode(tokens.content), tokens.alias);
                } else if (Array.isArray(tokens)) {
                  return tokens.map(encode);
                } else {
                  return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
                }
              },
              type: function (o) {
                return Object.prototype.toString.call(o).slice(8, -1);
              },
              objId: function (obj) {
                if (!obj['__id']) {
                  Object.defineProperty(obj, '__id', {
                    value: ++uniqueId
                  });
                }

                return obj['__id'];
              },
              // Deep clone a language definition (e.g. to extend it)
              clone: function deepClone(o, visited) {
                var clone,
                    id,
                    type = _.util.type(o);

                visited = visited || {};

                switch (type) {
                  case 'Object':
                    id = _.util.objId(o);

                    if (visited[id]) {
                      return visited[id];
                    }

                    clone = {};
                    visited[id] = clone;

                    for (var key in o) {
                      if (o.hasOwnProperty(key)) {
                        clone[key] = deepClone(o[key], visited);
                      }
                    }

                    return clone;

                  case 'Array':
                    id = _.util.objId(o);

                    if (visited[id]) {
                      return visited[id];
                    }

                    clone = [];
                    visited[id] = clone;
                    o.forEach(function (v, i) {
                      clone[i] = deepClone(v, visited);
                    });
                    return clone;

                  default:
                    return o;
                }
              },

              /**
               * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
               *
               * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
               *
               * @param {Element} element
               * @returns {string}
               */
              getLanguage: function (element) {
                while (element && !lang.test(element.className)) {
                  element = element.parentElement;
                }

                if (element) {
                  return (element.className.match(lang) || [, 'none'])[1].toLowerCase();
                }

                return 'none';
              },

              /**
               * Returns the script element that is currently executing.
               *
               * This does __not__ work for line script element.
               *
               * @returns {HTMLScriptElement | null}
               */
              currentScript: function () {
                if (typeof document === 'undefined') {
                  return null;
                }

                if ('currentScript' in document) {
                  return document.currentScript;
                } // IE11 workaround
                // we'll get the src of the current script by parsing IE11's error stack trace
                // this will not work for inline scripts


                try {
                  throw new Error();
                } catch (err) {
                  // Get file src url from stack. Specifically works with the format of stack traces in IE.
                  // A stack will look like this:
                  //
                  // Error
                  //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
                  //    at Global code (http://localhost/components/prism-core.js:606:1)
                  var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];

                  if (src) {
                    var scripts = document.getElementsByTagName('script');

                    for (var i in scripts) {
                      if (scripts[i].src == src) {
                        return scripts[i];
                      }
                    }
                  }

                  return null;
                }
              }
            },
            languages: {
              extend: function (id, redef) {
                var lang = _.util.clone(_.languages[id]);

                for (var key in redef) {
                  lang[key] = redef[key];
                }

                return lang;
              },

              /**
               * Insert a token before another token in a language literal
               * As this needs to recreate the object (we cannot actually insert before keys in object literals),
               * we cannot just provide an object, we need an object and a key.
               * @param inside The key (or language id) of the parent
               * @param before The key to insert before.
               * @param insert Object with the key/value pairs to insert
               * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
               */
              insertBefore: function (inside, before, insert, root) {
                root = root || _.languages;
                var grammar = root[inside];
                var ret = {};

                for (var token in grammar) {
                  if (grammar.hasOwnProperty(token)) {
                    if (token == before) {
                      for (var newToken in insert) {
                        if (insert.hasOwnProperty(newToken)) {
                          ret[newToken] = insert[newToken];
                        }
                      }
                    } // Do not insert token which also occur in insert. See #1525


                    if (!insert.hasOwnProperty(token)) {
                      ret[token] = grammar[token];
                    }
                  }
                }

                var old = root[inside];
                root[inside] = ret; // Update references in other language definitions

                _.languages.DFS(_.languages, function (key, value) {
                  if (value === old && key != inside) {
                    this[key] = ret;
                  }
                });

                return ret;
              },
              // Traverse a language definition with Depth First Search
              DFS: function DFS(o, callback, type, visited) {
                visited = visited || {};
                var objId = _.util.objId;

                for (var i in o) {
                  if (o.hasOwnProperty(i)) {
                    callback.call(o, i, o[i], type || i);

                    var property = o[i],
                        propertyType = _.util.type(property);

                    if (propertyType === 'Object' && !visited[objId(property)]) {
                      visited[objId(property)] = true;
                      DFS(property, callback, null, visited);
                    } else if (propertyType === 'Array' && !visited[objId(property)]) {
                      visited[objId(property)] = true;
                      DFS(property, callback, i, visited);
                    }
                  }
                }
              }
            },
            plugins: {},
            highlightAll: function (async, callback) {
              _.highlightAllUnder(document, async, callback);
            },
            highlightAllUnder: function (container, async, callback) {
              var env = {
                callback: callback,
                container: container,
                selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
              };

              _.hooks.run('before-highlightall', env);

              env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

              _.hooks.run('before-all-elements-highlight', env);

              for (var i = 0, element; element = env.elements[i++];) {
                _.highlightElement(element, async === true, env.callback);
              }
            },
            highlightElement: function (element, async, callback) {
              // Find language
              var language = _.util.getLanguage(element);

              var grammar = _.languages[language]; // Set language on the element, if not present

              element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language; // Set language on the parent, for styling

              var parent = element.parentNode;

              if (parent && parent.nodeName.toLowerCase() === 'pre') {
                parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
              }

              var code = element.textContent;
              var env = {
                element: element,
                language: language,
                grammar: grammar,
                code: code
              };

              function insertHighlightedCode(highlightedCode) {
                env.highlightedCode = highlightedCode;

                _.hooks.run('before-insert', env);

                env.element.innerHTML = env.highlightedCode;

                _.hooks.run('after-highlight', env);

                _.hooks.run('complete', env);

                callback && callback.call(env.element);
              }

              _.hooks.run('before-sanity-check', env);

              if (!env.code) {
                _.hooks.run('complete', env);

                callback && callback.call(env.element);
                return;
              }

              _.hooks.run('before-highlight', env);

              if (!env.grammar) {
                insertHighlightedCode(_.util.encode(env.code));
                return;
              }

              if (async && _self.Worker) {
                var worker = new Worker(_.filename);

                worker.onmessage = function (evt) {
                  insertHighlightedCode(evt.data);
                };

                worker.postMessage(JSON.stringify({
                  language: env.language,
                  code: env.code,
                  immediateClose: true
                }));
              } else {
                insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
              }
            },
            highlight: function (text, grammar, language) {
              var env = {
                code: text,
                grammar: grammar,
                language: language
              };

              _.hooks.run('before-tokenize', env);

              env.tokens = _.tokenize(env.code, env.grammar);

              _.hooks.run('after-tokenize', env);

              return Token.stringify(_.util.encode(env.tokens), env.language);
            },
            tokenize: function (text, grammar) {
              var rest = grammar.rest;

              if (rest) {
                for (var token in rest) {
                  grammar[token] = rest[token];
                }

                delete grammar.rest;
              }

              var tokenList = new LinkedList();
              addAfter(tokenList, tokenList.head, text);
              matchGrammar(text, tokenList, grammar, tokenList.head, 0);
              return toArray(tokenList);
            },
            hooks: {
              all: {},
              add: function (name, callback) {
                var hooks = _.hooks.all;
                hooks[name] = hooks[name] || [];
                hooks[name].push(callback);
              },
              run: function (name, env) {
                var callbacks = _.hooks.all[name];

                if (!callbacks || !callbacks.length) {
                  return;
                }

                for (var i = 0, callback; callback = callbacks[i++];) {
                  callback(env);
                }
              }
            },
            Token: Token
          };
          _self.Prism = _;

          function Token(type, content, alias, matchedStr, greedy) {
            this.type = type;
            this.content = content;
            this.alias = alias; // Copy of the full string this token was created from

            this.length = (matchedStr || '').length | 0;
            this.greedy = !!greedy;
          }

          Token.stringify = function stringify(o, language) {
            if (typeof o == 'string') {
              return o;
            }

            if (Array.isArray(o)) {
              var s = '';
              o.forEach(function (e) {
                s += stringify(e, language);
              });
              return s;
            }

            var env = {
              type: o.type,
              content: stringify(o.content, language),
              tag: 'span',
              classes: ['token', o.type],
              attributes: {},
              language: language
            };
            var aliases = o.alias;

            if (aliases) {
              if (Array.isArray(aliases)) {
                Array.prototype.push.apply(env.classes, aliases);
              } else {
                env.classes.push(aliases);
              }
            }

            _.hooks.run('wrap', env);

            var attributes = '';

            for (var name in env.attributes) {
              attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
            }

            return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
          };
          /**
           * @param {string} text
           * @param {LinkedList<string | Token>} tokenList
           * @param {any} grammar
           * @param {LinkedListNode<string | Token>} startNode
           * @param {number} startPos
           * @param {boolean} [oneshot=false]
           * @param {string} [target]
           */


          function matchGrammar(text, tokenList, grammar, startNode, startPos, oneshot, target) {
            for (var token in grammar) {
              if (!grammar.hasOwnProperty(token) || !grammar[token]) {
                continue;
              }

              var patterns = grammar[token];
              patterns = Array.isArray(patterns) ? patterns : [patterns];

              for (var j = 0; j < patterns.length; ++j) {
                if (target && target == token + ',' + j) {
                  return;
                }

                var pattern = patterns[j],
                    inside = pattern.inside,
                    lookbehind = !!pattern.lookbehind,
                    greedy = !!pattern.greedy,
                    lookbehindLength = 0,
                    alias = pattern.alias;

                if (greedy && !pattern.pattern.global) {
                  // Without the global flag, lastIndex won't work
                  var flags = pattern.pattern.toString().match(/[imsuy]*$/)[0];
                  pattern.pattern = RegExp(pattern.pattern.source, flags + 'g');
                }

                pattern = pattern.pattern || pattern;

                for ( // iterate the token list and keep track of the current token/string position
                var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
                  var str = currentNode.value;

                  if (tokenList.length > text.length) {
                    // Something went terribly wrong, ABORT, ABORT!
                    return;
                  }

                  if (str instanceof Token) {
                    continue;
                  }

                  var removeCount = 1; // this is the to parameter of removeBetween

                  if (greedy && currentNode != tokenList.tail.prev) {
                    pattern.lastIndex = pos;
                    var match = pattern.exec(text);

                    if (!match) {
                      break;
                    }

                    var from = match.index + (lookbehind && match[1] ? match[1].length : 0);
                    var to = match.index + match[0].length;
                    var p = pos; // find the node that contains the match

                    p += currentNode.value.length;

                    while (from >= p) {
                      currentNode = currentNode.next;
                      p += currentNode.value.length;
                    } // adjust pos (and p)


                    p -= currentNode.value.length;
                    pos = p; // the current node is a Token, then the match starts inside another Token, which is invalid

                    if (currentNode.value instanceof Token) {
                      continue;
                    } // find the last node which is affected by this match


                    for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === 'string' && !k.prev.value.greedy); k = k.next) {
                      removeCount++;
                      p += k.value.length;
                    }

                    removeCount--; // replace with the new match

                    str = text.slice(pos, p);
                    match.index -= pos;
                  } else {
                    pattern.lastIndex = 0;
                    var match = pattern.exec(str);
                  }

                  if (!match) {
                    if (oneshot) {
                      break;
                    }

                    continue;
                  }

                  if (lookbehind) {
                    lookbehindLength = match[1] ? match[1].length : 0;
                  }

                  var from = match.index + lookbehindLength,
                      match = match[0].slice(lookbehindLength),
                      to = from + match.length,
                      before = str.slice(0, from),
                      after = str.slice(to);
                  var removeFrom = currentNode.prev;

                  if (before) {
                    removeFrom = addAfter(tokenList, removeFrom, before);
                    pos += before.length;
                  }

                  removeRange(tokenList, removeFrom, removeCount);
                  var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);
                  currentNode = addAfter(tokenList, removeFrom, wrapped);

                  if (after) {
                    addAfter(tokenList, currentNode, after);
                  }

                  if (removeCount > 1) matchGrammar(text, tokenList, grammar, currentNode.prev, pos, true, token + ',' + j);
                  if (oneshot) break;
                }
              }
            }
          }
          /**
           * @typedef LinkedListNode
           * @property {T} value
           * @property {LinkedListNode<T> | null} prev The previous node.
           * @property {LinkedListNode<T> | null} next The next node.
           * @template T
           */

          /**
           * @template T
           */


          function LinkedList() {
            /** @type {LinkedListNode<T>} */
            var head = {
              value: null,
              prev: null,
              next: null
            };
            /** @type {LinkedListNode<T>} */

            var tail = {
              value: null,
              prev: head,
              next: null
            };
            head.next = tail;
            /** @type {LinkedListNode<T>} */

            this.head = head;
            /** @type {LinkedListNode<T>} */

            this.tail = tail;
            this.length = 0;
          }
          /**
           * Adds a new node with the given value to the list.
           * @param {LinkedList<T>} list
           * @param {LinkedListNode<T>} node
           * @param {T} value
           * @returns {LinkedListNode<T>} The added node.
           * @template T
           */


          function addAfter(list, node, value) {
            // assumes that node != list.tail && values.length >= 0
            var next = node.next;
            var newNode = {
              value: value,
              prev: node,
              next: next
            };
            node.next = newNode;
            next.prev = newNode;
            list.length++;
            return newNode;
          }
          /**
           * Removes `count` nodes after the given node. The given node will not be removed.
           * @param {LinkedList<T>} list
           * @param {LinkedListNode<T>} node
           * @param {number} count
           * @template T
           */


          function removeRange(list, node, count) {
            var next = node.next;

            for (var i = 0; i < count && next !== list.tail; i++) {
              next = next.next;
            }

            node.next = next;
            next.prev = node;
            list.length -= i;
          }
          /**
           * @param {LinkedList<T>} list
           * @returns {T[]}
           * @template T
           */


          function toArray(list) {
            var array = [];
            var node = list.head.next;

            while (node !== list.tail) {
              array.push(node.value);
              node = node.next;
            }

            return array;
          }

          if (!_self.document) {
            if (!_self.addEventListener) {
              // in Node.js
              return _;
            }

            if (!_.disableWorkerMessageHandler) {
              // In worker
              _self.addEventListener('message', function (evt) {
                var message = JSON.parse(evt.data),
                    lang = message.language,
                    code = message.code,
                    immediateClose = message.immediateClose;

                _self.postMessage(_.highlight(code, _.languages[lang], lang));

                if (immediateClose) {
                  _self.close();
                }
              }, false);
            }

            return _;
          } //Get current script and highlight


          var script = _.util.currentScript();

          if (script) {
            _.filename = script.src;

            if (script.hasAttribute('data-manual')) {
              _.manual = true;
            }
          }

          function highlightAutomaticallyCallback() {
            if (!_.manual) {
              _.highlightAll();
            }
          }

          if (!_.manual) {
            // If the document state is "loading", then we'll use DOMContentLoaded.
            // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
            // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
            // might take longer one animation frame to execute which can create a race condition where only some plugins have
            // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
            // See https://github.com/PrismJS/prism/issues/2102
            var readyState = document.readyState;

            if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
              document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
            } else {
              if (window.requestAnimationFrame) {
                window.requestAnimationFrame(highlightAutomaticallyCallback);
              } else {
                window.setTimeout(highlightAutomaticallyCallback, 16);
              }
            }
          }

          return _;
        }(_self);

        if ( module.exports) {
          module.exports = Prism;
        } // hack for components to work correctly in node.js


        if (typeof commonjsGlobal !== 'undefined') {
          commonjsGlobal.Prism = Prism;
        }
      });

      let version = `1.19.0`;

      function _prism() {
        return `https://cdnjs.cloudflare.com/ajax/libs/prism/${version}`;
      }

      function selectTheme(theme) {
        const cur = document.querySelector(`link.prism-theme-hook[data-theme=${theme}]`);

        if (!cur) {
          return false;
        }

        cur.disabled = false;
        const themes = document.querySelectorAll(`link.prism-theme-hook:not([data-theme=${theme}])`);
        themes.forEach(v => v.disabled = true);
        return true;
      }

      function usePrismTheme(theme = 'prism') {
        const [state, updateState] = u$1({
          loading: false,
          error: undefined
        });
        useEffect(() => {
          if (selectTheme(theme)) {
            return;
          }

          updateState(s => {
            s.loading = true;
            s.error = undefined;
          });
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = `${_prism()}/themes/${theme}.min.css`;
          link.className = 'prism-theme-hook';
          link.setAttribute('data-theme', theme);

          link.onload = () => {
            selectTheme(theme);
            updateState(s => {
              s.loading = false;
            });
          };

          link.onerror = e => {
            const err = typeof e === 'string' ? e : e === null || e === void 0 ? void 0 : e['error'];
            updateState(s => {
              s.loading = false;
              s.error = err;
            });
          };

          document.head.appendChild(link);
        }, [theme]);
        const {
          loading,
          error
        } = state;
        return {
          loading,
          error
        };
      }
      const loaded = [];
      const immer = new nn();
      immer.setAutoFreeze(false);
      const {
        produce
      } = immer;
      function usePrismLanguage(language) {
        const [state, setState] = useState({
          loading: !(loaded.includes(language) || prismCore.languages[language]),
          grammar: prismCore.languages[language],
          error: undefined
        });
        useEffect(() => {
          var _window$Prism;

          window['Prism'] = (_window$Prism = window['Prism']) !== null && _window$Prism !== void 0 ? _window$Prism : prismCore;

          if (loaded.includes(language) || prismCore.languages[language]) {
            setState(produce(s => {
              s.loading = false;
              s.grammar = prismCore.languages[language];
              s.error = undefined;
            }));
            return;
          }

          setState(produce(s => {
            s.loading = true;
            s.error = undefined;
          }));
          dependencies(components_1, [language], loaded).load(id => {
            return new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = `${_prism()}/components/prism-${id}.min.js`; // script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/components/prism-${id}.js`;

              script.onload = () => {
                if (!loaded.includes(id)) {
                  loaded.push(id);
                }

                resolve();
              };

              script.onerror = reject;
              document.head.appendChild(script);
            });
          }, {
            series: async (before, after) => {
              await before;
              await after();
            },
            parallel: async values => {
              await Promise.all(values);
            }
          }).then(() => {
            setState(produce(s => {
              s.loading = false;
              s.grammar = prismCore.languages[language];
              s.error = undefined;
            }));
          }).catch(e => {
            setState(produce(s => {
              s.loading = false;
              s.error = e;
            }));
          });
        }, [language]);
        const {
          loading,
          error,
          grammar
        } = state;
        return {
          loading,
          error,
          grammar,
          Prism: prismCore
        };
      }

      const SimpleCodeEditor = ({
        value,
        onChange,
        language,
        theme = 'prism'
      }) => {
        const [highlight, setHighlight] = useState(null);
        const {
          grammar,
          Prism
        } = usePrismLanguage(language);
        useEffect(() => {
          if (grammar) {
            setHighlight(() => {
              return v => Prism.highlight(v, grammar);
            });
          }
        }, [grammar]);
        return /*#__PURE__*/React.createElement(lib, {
          value: value,
          onValueChange: onChange,
          highlight: highlight !== null && highlight !== void 0 ? highlight : code => code,
          padding: 10,
          style: {
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12
          }
        });
      };

      function useXmlPlaygroundContainer({
        updateState,
        getState,
        subscribe
      }) {
        const onXmlChange = v => {
          updateState(s => {
            var _valid$err;

            s.xml = v;
            const valid = parser.validate(v);
            s.xmlError = valid === null || valid === void 0 ? void 0 : (_valid$err = valid['err']) === null || _valid$err === void 0 ? void 0 : _valid$err['msg'];

            if (s.xmlError) {
              console.log(`Invalid`, valid);
              return;
            }

            s.json = JSON.stringify(parser.parse(v, s.parseOptions), null, 2);
            s.jsonError = '';
          });
        };

        const onJsonChange = v => {
          updateState(s => s.json = v);
        };

        const onParseOptionChange = v => {
          updateState(s => Object.assign(s.parseOptions, v));
        };

        const convertJsonToXml = () => {
          updateState(s => {
            try {
              const o = JSON.parse(s.json);
              const parser$1 = new parser.j2xParser({ ...s.parseOptions,
                format: true
              });
              s.xml = parser$1.parse(o);
            } catch (e) {
              s.jsonError = e + '';
              return;
            }
          });
        };

        {
          let last = getState().parseOptions;
          subscribe(s => {
            if (last !== s.parseOptions) {
              last = s.parseOptions;
              onXmlChange(s.xml);
            }
          });
        }
        return {
          onXmlChange,
          onJsonChange,
          onParseOptionChange,
          convertJsonToXml
        };
      }

      function createInitialState() {
        const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="VcsDirectoryMappings">
    <mapping directory="" vcs="Git" />
    <properties>
      <a>b</a>
      <c>b</c>
    </properties>
    Text Here
  </component>
</project>
`.trim();
        const parseOptions = {
          attributeNamePrefix: '',
          attrNodeName: '#attr',
          textNodeName: '#text',
          ignoreAttributes: false,
          ignoreNameSpace: false,
          allowBooleanAttributes: false,
          parseNodeValue: true,
          parseAttributeValue: false,
          trimValues: true,
          cdataTagName: '__cdata',
          cdataPositionChar: '\\c',
          parseTrueNumberOnly: false,
          arrayMode: false // tagValueProcessor: (a) => decode(a, { useNamedReferences: true }),
          // attrValueProcessor: (a) => decode(a),

        };
        return {
          xml,
          xmlError: '',
          json: JSON.stringify(parser.parse(xml, parseOptions), null, 2),
          jsonError: '',
          parseOptions
        };
      }

      const XmlPlaygroundContext = createSubscriptionContainer(useXmlPlaygroundContainer);

      const ParseOption = () => {
        const {
          textNodeName,
          attrNodeName,
          ignoreAttributes,
          parseNodeValue,
          parseAttributeValue,
          attributeNamePrefix
        } = XmlPlaygroundContext.useSelector(({
          parseOptions: {
            textNodeName,
            attrNodeName,
            ignoreAttributes,
            parseNodeValue,
            parseAttributeValue,
            attributeNamePrefix
          }
        }) => ({
          textNodeName,
          attrNodeName,
          ignoreAttributes,
          parseNodeValue,
          parseAttributeValue,
          attributeNamePrefix
        }));
        const {
          onParseOptionChange
        } = XmlPlaygroundContext.useContainer();

        const createHandler = k => {
          const [name, value] = Object.entries(k)[0];

          if (typeof value === 'boolean') {
            return {
              checked: value,
              onChange: v => onParseOptionChange({
                [name]: v.target.checked
              })
            };
          }

          return {
            value,
            onChange: v => onParseOptionChange({
              [name]: v.target.value
            })
          };
        };

        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", _extends({
          type: "checkbox"
        }, createHandler({
          parseAttributeValue
        }))), "\u89E3\u6790\u5C5E\u6027\u503C")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", _extends({
          type: "checkbox"
        }, createHandler({
          parseNodeValue
        }))), "\u89E3\u6790\u8282\u70B9\u503C")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", _extends({
          type: "checkbox"
        }, createHandler({
          ignoreAttributes
        }))), "\u5FFD\u7565\u5C5E\u6027")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          checked: Boolean(textNodeName),
          onChange: v => onParseOptionChange({
            textNodeName: v.target.checked ? '#text' : false
          })
        }), "\u4FDD\u7559\u6587\u672C\u8282\u70B9\u4E3A #text")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "\u5C5E\u6027\u540D\u5B57\u524D\u7F00", /*#__PURE__*/React.createElement("input", _extends({
          type: "text"
        }, createHandler({
          attributeNamePrefix
        }))))));
      };

      const XmlPlaygroundContent = () => {
        const [theme, setTheme] = useState('prism-solarizedlight');
        usePrismTheme(theme);
        const {
          xml,
          json,
          xmlError,
          jsonError
        } = XmlPlaygroundContext.useSelector(({
          xml,
          json,
          xmlError,
          jsonError
        }) => ({
          xml,
          json,
          xmlError,
          jsonError
        }));
        const {
          onXmlChange,
          onJsonChange,
          convertJsonToXml
        } = XmlPlaygroundContext.useContainer();
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Row, {
          gutter: 16
        }, /*#__PURE__*/React.createElement(Col, {
          span: 12
        }, /*#__PURE__*/React.createElement(Card, {
          title: 'XML'
        }, /*#__PURE__*/React.createElement(SimpleCodeEditor, {
          value: xml,
          onChange: onXmlChange,
          language: "xml"
        }), xmlError && /*#__PURE__*/React.createElement(Alert, {
          type: 'error',
          message: xmlError
        })), /*#__PURE__*/React.createElement(ParseOption, null)), /*#__PURE__*/React.createElement(Col, {
          span: 12
        }, /*#__PURE__*/React.createElement(Card, {
          title: 'JSON',
          extra: /*#__PURE__*/React.createElement(Button, {
            onClick: convertJsonToXml
          }, "To XML")
        }, /*#__PURE__*/React.createElement(SimpleCodeEditor, {
          value: json,
          onChange: onJsonChange,
          language: "json"
        }), jsonError && /*#__PURE__*/React.createElement(Alert, {
          type: 'error',
          message: jsonError
        })))));
      };

      const XmlPlayground = exports('XmlPlayground', () => {
        return /*#__PURE__*/React.createElement(XmlPlaygroundContext.Provider, {
          initialState: createInitialState()
        }, /*#__PURE__*/React.createElement(XmlPlaygroundContent, null));
      });

      var title = "XML工具";
      var description = "XML格式化、JSON 转换、生成";
      var metadata = exports('metadata', {
      	title: title,
      	description: description
      });

    }
  };
});
//# sourceMappingURL=wener-apis-lang-xml.system.js.map
