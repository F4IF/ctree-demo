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
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class CTreeToggleButton extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none !important;
      }
    </style>

    <paper-icon-button id="button" icon="[[icon]]" on-tap="toggle"></paper-icon-button>
    <template is="dom-if" if="[[title]]">
      <paper-tooltip for="button" offset="-8">[[title]]</paper-tooltip>
    </template>
`;
  }

  static get is() { return 'ctree-toggle-button'; }

  static get properties() {
    return {
      icon: {
        type: String,
        observer: '_elementChanged',
      },

      color: {
        type: String,
      },

      title: {
        type: String,
      },

      checked: {
        type: Boolean,
        notify: true,
      },

      iconUnchecked: {
        type: String,
      },

      iconChecked: {
        type: String,
      },

      colorUnchecked: {
        type: String,
      },

      colorChecked: {
        type: String,
      },

      titleUnchecked: {
        type: String,
      },

      titleChecked: {
        type: String,
      },
    };
  }

  static get observers() {
    return [
      '_checkedChanged(checked, iconUnchecked, iconChecked, colorUnchecked, colorChecked, titleUnchecked, titleChecked)',
    ];
  }

  toggle() {
    this.set('checked', !this.checked);
  }

  _checkedChanged(checked, iconUnchecked, iconChecked, colorUnchecked, colorChecked, titleUnchecked, titleChecked) {
    var icon = checked ? iconChecked : iconUnchecked;
    if (icon) {
      this.set('icon', icon);
    }
    var color = checked ? colorChecked : colorUnchecked;
    if (color) {
      this.$.button.style.color = color;
    }
    var title = checked ? titleChecked : titleUnchecked;
    if (title) {
      this.set('title', title);
    }
  }
}

// Register custom element definition using standard platform API
customElements.define(CTreeToggleButton.is, CTreeToggleButton);
