/**
@license
Copyright (c) 2017 Foundation For an Innovative Future (InnovativeFuture.org)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or any
later version.

Foundation For an Innovative Future reserves the right to release the
covered work, in part or in whole, under a different open source
license and/or with specific copyleft exclusions.  Such a release
would not invalidate the license for this project, although the
project released with a modified license would not be considered
part of this covered work or subject to the copyleft portions of this
license even if the projects are identical.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Please email contact@innovativeFuture.org for inquiries related to
this license.
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-spinner/paper-spinner.js';
import './ctree-structure-list-node.js';
import './icons.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class CTreeStructureListNodeList extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      .children {
        display: block;
      }
      paper-icon-button {
        display: none;
      }
      paper-spinner {
        display: none;
        padding: 10px;
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
    </style>

    <div id="children" class="children"></div>
    <paper-icon-button id="expand" on-tap="loadChildren" icon="arrow-drop-down-circle"></paper-icon-button>
    <paper-spinner id="spinner" active=""></paper-spinner>
`;
  }

  static get is() { return 'ctree-structure-list-node-list'; }

  static get properties() {
    return {
      elementId: {
        type: Number,
        observer: '_elementIdChanged'
      }
    };
  }

  loadChildren() {
    this.$.expand.style.display = "none";
    this.$.spinner.style.display = "inline-block";
    // TODO: load more children
  }

  _elementIdChanged(elementId) {
    var parent = ctreeElements[elementId];
    if (parent) {
      var childContainer = this.$.children;
      var childNodes = childContainer.childNodes;
      for (var i = childNodes.length - 1; i >= 0; i--) {
        childContainer.removeChild(childNodes[i]);
      }
      var children = parent.children;
      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (child) {
          var node = document.createElement('ctree-structure-list-node');
          node.elementId = child.id;
          childContainer.appendChild(node);
        }
      }
      this.$.expand.style.display = parent.childrenSearchComplete ? "none" : "inline-block";
    }
  }
}

// Register custom element definition using standard platform API
customElements.define(CTreeStructureListNodeList.is, CTreeStructureListNodeList);
