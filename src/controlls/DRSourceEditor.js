"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRSourceEditor = exports.ShaderError = void 0;
const DOMUtils_1 = require("./DOMUtils");
const CodeMirror = __importStar(require("codemirror"));
require("codemirror/addon/search/search");
require("codemirror/addon/search/searchcursor");
require("codemirror/addon/comment/comment");
require("codemirror/addon/dialog/dialog");
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/edit/closebrackets");
require("codemirror/addon/wrap/hardwrap");
require("codemirror/addon/fold/foldcode");
require("codemirror/addon/fold/foldgutter");
require("codemirror/addon/fold/indent-fold");
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/javascript-hint");
require("codemirror/addon/display/rulers");
require("codemirror/addon/display/panel");
require("codemirror/mode/clike/clike.js");
require("codemirror/addon/display/autorefresh");
require("codemirror/keymap/sublime");
class ShaderError {
    constructor(line, error) {
        this.line = line;
        this.error = error;
    }
}
exports.ShaderError = ShaderError;
class DRSourceEditor {
    update(Scene0) {
        this.fragmentEditor.getDoc().setValue(Scene0);
        this.fragmentEditor.refresh();
    }
    markErrors(shaderErrors) {
        shaderErrors.forEach((err) => {
            let errNode = DOMUtils_1.DOMUtils.create("abbr");
            errNode.classList.add("error-info");
            errNode.title = err.error;
            this.fragmentEditor.setGutterMarker(err.line - 1, "note-gutter", errNode);
            // let p = DOMUtils.create.el("p");
            // let m = DOMUtils.create.el("mark", err.line.toString());
            // let s = DOMUtils.create.el("span", err.error);
            // p.appendChild(m);
            // p.appendChild(s);
            // immediate.appendChild(p);
        });
    }
    constructor(parent) {
        this.parent = parent;
    }
    render() {
        let html = `<div class="modal fade" id="mod-source" data-backdrop="false" >
      <div class="modal-dialog modal-fullscreen">
      
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Fragment source(glsl)</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
           
              <form id="editor-fragment">
                  <textarea id="fragment" col="10" rows="10">
                  </textarea>
              </form>
             
            </div>
            <div class="modal-footer">
              <div>
              Errors <span class="badge text-bg-secondary mx-4">0</span>
              </div>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
  </div>`;
        let result = DOMUtils_1.DOMUtils.toDOM(html);
        this.parent.appendChild(result);
        this.fragmentEditor = CodeMirror.fromTextArea(DOMUtils_1.DOMUtils.get("#fragment"), {
            gutters: ["note-gutter", "CodeMirror-linenumbers"],
            viewportMargin: Infinity,
            lineNumbers: true,
            matchBrackets: true,
            mode: 'x-shader/x-fragment',
            keyMap: 'sublime',
            autoCloseBrackets: true,
            showCursorWhenSelecting: true,
            theme: "monokai",
            indentUnit: 4,
            lineWrapping: true,
            autofocus: false,
            autorefresh: true,
            extraKeys: {
                "F5": (instance) => {
                    this.onBuild(instance.getValue());
                }
            }
        });
        // this.fragmentEditor.on("change", (cm: CodeMirror) => {
        //   let source = cm.getValue();
        //   console.log(source);
        // });
    }
}
exports.DRSourceEditor = DRSourceEditor;
