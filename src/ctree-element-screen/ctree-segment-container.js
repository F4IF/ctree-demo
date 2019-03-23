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

import { microTask } from '@polymer/polymer/lib/utils/async.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '../ctree-icons/ctree-icons.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class CTreeSegmentContainer extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      table {
        width: 100%;
        border: 0;
        border-spacing: 0;
      }
      table td {
        vertical-align: middle;
        padding: 0;
      }
      #content {
        position: relative;
        width: 100%;
      }
      .move {
        width: 100%;
        text-align: center;
      }
      paper-icon-button[hidden] {
        display: none !important;
      }
      paper-ripple[hidden] {
        display: none !important;
      }
      ctree-feedback-bar {
        text-align: right;
        white-space: nowrap;
      }
    </style>

    <!-- TODO: hide second row unless in edit mode for row -->
    <table id="nav"><tbody><tr>
      <td><paper-icon-button id="previous" icon="navigate-before" title="previous element variation" hidden\$="[[_firstVariation(_variationIndex)]]" on-tap="previous"></paper-icon-button></td>
      <td id="content" on-tap="_contentClicked"><div id="container"></div><paper-ripple hidden\$="[[editing]]"></paper-ripple></td>
      <td><paper-icon-button id="next" icon="navigate-next" title="next element variation" hidden\$="[[_lastVariation(_variationIndex)]]" on-tap="next"></paper-icon-button></td>
    </tr></tbody></table>
    <table><tbody><tr hidden\$="[[!editing]]">
      <td><paper-icon-button id="delete" icon="delete" title="delete" hidden\$="[[!_canDelete(firstSegment, lastSegment)]]" on-tap="_fireDeleteTapped"></paper-icon-button></td>
      <td class="move">
        <paper-icon-button id="move-up" icon="move-up" title="move up" hidden\$="[[firstSegment]]" on-tap="_fireMoveUpTapped"></paper-icon-button>
        <paper-icon-button id="move-down" icon="move-down" title="move down" hidden\$="[[lastSegment]]" on-tap="_fireMoveDownTapped"></paper-icon-button>
      </td>
      <td class="feedback"><ctree-feedback-bar segment="[[segment]]"></ctree-feedback-bar></td>
    </tr></tbody></table>
`;
  }

  static get is() { return 'ctree-segment-container'; }

  /**
   * Fired when a the delete button is tapped.
   *
   * @event editing-segment-changed
   * @param {{value: Boolean, segment: segmentData}} detail
   *   value: New value of editing parameter.
   *   segment: Contains data for segment held by container.
   */

  /**
   * Fired when a the delete button is tapped.
   *
   * @event delete-tapped
   * @param {{segment: segmentData}} detail Contains data for segment held by container.
   */

  /**
   * Fired when a the move up button is tapped.
   *
   * @event move-up-tapped
   * @param {{segment: segmentData}} detail Contains data for segment held by container.
   */

  /**
   * Fired when a the move down button is tapped.
   *
   * @event move-down-tapped
   * @param {{segment: segmentData}} detail Contains data for segment held by container.
   */

  static get properties() {
    return {
      /**
       * Segments data
       *
       * Structure:
       *   {
       *     id: Number,
       *     type: SegmentType,
       *     variations: [{
       *       id: Number,
       *       data: dynamic,	// data type depends on segment type
       *     }, ...],
       *   }
       */
      segment: {
        type: Object,
        notify: true,
        observer: '_segmentChanged',
      },

      variationId: {
        type: Number,
        notify: true,
        observer: '__variationIdChanged',
      },

      firstSegment: Boolean,

      lastSegment: Boolean,

      editing: {
        type: Boolean,
        value: false,
        observer: '__editingChanged',
      },

      _variationIndex: {
        type: Number,
        observer: '__variationIndexChanged',
      },

      __updatingVariation: {
        type: Boolean,
        value: false,
      },
    };
  }

  attached() {
    var component = this.shadowRoot.querySelector('#component');
    if (component) {
      component.addEventListener('editing-changed', e => __editingComponentChanged(e));
      component.addEventListener('add-segment-variation', e => _addSegmentVariation(e));
    }
  }

  detached() {
    var component = this.shadowRoot.querySelector('#component');
    if (component) {
      component.removeEventListener('editing-changed', e => __editingComponentChanged(e));
      component.removeEventListener('add-segment-variation', e => _addSegmentVariation(e));
    }
  }

  previous() {
    if (this._variationIndex <= 0) return;

    this._variationIndex--;
  }

  next() {
    if (!this.segment || !this.segment.variations || this._variationIndex >= this.segment.variations.length - 1) return;

    this._variationIndex++;
  }

  _segmentChanged(segment) {
    // validate component type
    var type = segment.type;
    var component = this.shadowRoot.querySelector('#component');
    if (!type || !component || component.tagName.toLowerCase() !== type.componentName) {
      var parent = this.$.container;
      var child;
      if (component) {
        component.addEventListener('editing-changed', e => __editingComponentChanged(e));
        component.addEventListener('add-segment-variation', e => _addSegmentVariation(e));
      }
      while (child = parent.firstChild) {
        parent.removeChild(child);
      }
      if (type) {
        component = document.createElement(type.componentName);
        component.id = 'component';
        component.removeEventListener('editing-changed', e => __editingComponentChanged(e));
        component.removeEventListener('add-segment-variation', e => _addSegmentVariation(e));
        parent.appendChild(component);
      }
    }
  }

  _contentClicked() {
    if (this.editing) return;

    this.editing = true;
  }

  _addSegmentVariation(e) {
    var segmentData = e.detail.data;
    var id = Math.floor(Math.random() * 2000000000) + 1;  // TODO: this would come from loading when uploading it
    this.segment.variations.splice(this._variationIndex + 1, 0, {id: id, data: segmentData});
    this._variationIndex = this._variationIndex + 1;
    this.editing = false;

    this.__updatingVariation = true;
    this.variationId = id;
    this.__updatingVariation = false;
  }

  __variationIdChanged(id) {
    if (!this.segment || this.__updatingVariation) return;

    this.__updatingVariation = true;

    var index = -1;
    var variations = this.segment.variations;
    for (var i = 0; i < variations.length; i++) {
      if (variations[i].id == id) {
        index = i;
        break;
      }
    }
    if (index < 0) {
      index = 0;
      this.variationId = variations[0].id;
    }
    this._variationIndex = index;

    this.__updatingVariation = false;
  }

  __editingChanged(value) {
    var component = this.shadowRoot.querySelector('#component');
    if (component) {
      component.editing = value;
      this.dispatchEvent(new CustomEvent('editing-segment-changed', {detail: {value: value, segment: this.segment}, bubbles: true, composed: true}));
    }
  }

  __editingComponentChanged() {
    microTask.run(() => this.__updateEditingFromComponent());
  }

  __updateEditingFromComponent() {
    var component = this.shadowRoot.querySelector('#component');
    if (!component || this.editing === component.editing) return;

    this.editing = component.editing;
    if (!this.editing) {
      component.notifyPath('data');
      // TODO: should be able to remove after update to Polymer 2.0
      component._dataChanged(component.data);
    }
  }

  __variationIndexChanged(index) {
    if (!this.segment) return;

    var variation = this.segment.variations[index];
    var component = this.shadowRoot.querySelector('#component');
    if (component) {
      component.set('data', variation.data);
      // TODO: don't set height percentage, let full image size be visible
      component.set('heightPercent', '56.25%');
    }

    if (!this.__updatingVariation) {
      this.__updatingVariation = true;

      this._variationId = variation.id;

      this.__updatingVariation = false;
    }
  }

  _firstVariation(index) {
    return index === 0;
  }

  _lastVariation(index) {
    return !this.segment || !this.segment.variations || index === this.segment.variations.length - 1;
  }

  _canDelete(first, last) {
    return !first || !last;
  }

  _fireDeleteTapped() {
    this.dispatchEvent(new CustomEvent('delete-tapped', {detail: {segment: this.segment}, bubbles: true, composed: true}));
  }

  _fireMoveUpTapped() {
    this.dispatchEvent(new CustomEvent('move-up-tapped', {detail: {segment: this.segment}, bubbles: true, composed: true}));
  }

  _fireMoveDownTapped() {
    this.dispatchEvent(new CustomEvent('move-down-tapped', {detail: {segment: this.segment}, bubbles: true, composed: true}));
  }
}

// Register custom element definition using standard platform API
customElements.define(CTreeSegmentContainer.is, CTreeSegmentContainer);
