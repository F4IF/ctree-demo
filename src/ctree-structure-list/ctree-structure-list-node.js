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

import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-spinner/paper-spinner.js';
import './ctree-structure-list-node-list.js';
import './icons.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class CTreeStructureListNode extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        padding: 4px;
      }
      .itemRow {
        display: none;
        white-space: nowrap;
      }
      paper-button {
        height: 28px;
      	padding: 6px;
        text-transform: none;
        vertical-align: middle;
      	margin: 0px;
      }
      iron-icon {
        padding: 0 4px 0 0;
        width: 24px;
        height: 24px;
      }
      paper-icon-button {
        width: 28px;
        height: 28px;
      	padding: 4px;
      }
      paper-spinner {
        width: 18px;
        height: 18px;
        vertical-align: middle;
      }
      ctree-structure-list-node-list {
        display: none;
        padding: 0 0 0 24px;
      }
    </style>

    <div id="itemRow" class="itemRow">
      <paper-button on-tap="openElement">
        <iron-icon id="icon"></iron-icon>
        <div id="title"></div>
      </paper-button><paper-icon-button id="expand" on-tap="toggleExpanded" icon="expand-more"></paper-icon-button>
      <paper-spinner id="spinner"></paper-spinner>
    </div>
    <ctree-structure-list-node-list id="childrenRow"></ctree-structure-list-node-list>
`;
  }

  static get is() { return 'ctree-structure-list-node'; }

  static get properties() {
    return {
      elementId: {
        type: Number,
        observer: '_elementIdChanged'
      },
      expanded: {
        type: Boolean,
        value: false,
        observer: '_expandedChanged'
        }
    };
  }

  openElement() {
    var elementDialog = document.querySelector('ctree-dialogs');
    if (elementDialog) {
      elementDialog.elementId = this.elementId;
      elementDialog.openElementDialog();
    } else {
      console.error("Error: must include ctree-dialogs tag in body of index.html before app tag");
    }
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  _elementIdChanged(elementId) {
    if (ctreeElements) {
      this.expanded = false;
      var element = ctreeElements[elementId];
      if (element) {
        this.$.itemRow.style.display = "block";
        var type = ctreeTypes[element.type];
        if (type) {
          this.$.icon.setAttribute('src', type.iconUrl);
        }
        this.$.title.textContent = element.title;
      } else {
        // TODO: show error icon & "unknown" text (hide expand icon)
        this.$.itemRow.style.display = "none";
      }
    }
  }

  _expandedChanged(expanded) {
    if (expanded) {
      this.$.expand.style.display = "none";
      var element = ctreeElements[this.elementId];
      if (element && (this.elementId == this.$.childrenRow.elementId || (element.children && element.children.length > 0))) {
        this.$.spinner.active = false;
        this.$.expand.icon = "expand-less";
        this.$.expand.style.display = "inline-block";
        this.$.childrenRow.style.display = "block";
        if (this.elementId != this.$.childrenRow.elementId) {
            this.$.childrenRow.elementId = this.elementId;
        }
      } else {
        this.$.spinner.active = true;
        // TODO: load children from server, when done stop spinner, if succeed with > 0 children add node list, if error from server restore expand button
      }
    } else {
      this.$.expand.icon = "expand-more";
      this.$.expand.style.display = "inline-block";
      this.$.spinner.active = false;
      this.$.childrenRow.style.display = "none";
    }
  }
}

// Register custom element definition using standard platform API
customElements.define(CTreeStructureListNode.is, CTreeStructureListNode);
