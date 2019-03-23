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
import '../ctree-icons/ctree-icons.js';
import './ctree-segment-container.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class CTreeDescription extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      paper-icon-button {
        display: block;
        margin: 8px auto;
      }
      ctree-segment-container {
        width: 100%;
      }
      div {
        width: 100%;
      }
      paper-icon-button[hidden] {
        display: none !important;
      }
    </style>
    <div id="container"></div>
`;
  }

  static get is() { return 'ctree-description'; }

  static get properties() {
    return {
      /**
       * Segments data
       *
       * Structure:
       *   [{
       *     id: Number,
       *     type: SegmentType,
       *     variations: [{
       *       id: Number,
       *       data: dynamic,	// data type depends on segment type
       *     }, ...],
       *   }, ...],
       */
      segments: {
        type: Array,
        notify: true,
        observer: '_segmentsChanged',
      },

      segmentIds: {
        type: Array,
        notify: true,
        observer: '_segmentIdsChanged',
      },

      editingSegmentId: {
        type: Number,
        notify: true,
      },
    };
  }

  static get __LISTENER_MAPS() {
    return CTreeDescription.__LISTENER_MAPS_CACHED ? CTreeDescription.__LISTENER_MAPS_CACHED
      : CTreeDescription.__LISTENER_MAPS_CACHED = {
      'PAPER-ICON-BUTTON': {
        'tap': '_addClicked',
      },
      'CTREE-SEGMENT-CONTAINER': {
        'add-segment-variation': '_addSegmentVariation',
        'editing-segment-changed': '_editingChanged',
        'delete-tapped': '_deleteTapped',
        'move-up-tapped': '_moveUpTapped',
        'move-down-tapped': '_moveDownTapped',
      },
    };
  }

  __updateListeners(element, func) {
    var eventListeners = CTreeDescription.__LISTENER_MAPS[element.tagName];
    for (var key in eventListeners) {
      func.call(element, key, this[eventListeners[key]].bind(this));
    }
  }

  attached() {
    var children = this.$.container.children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      this.__updateListeners(child, child.addEventListener);
    }
  }

  detached() {
    var children = this.$.container.children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      this.__updateListeners(child, child.removeEventListener);
    }
  }

  _addClicked(e) {
    //console.log('click: ' + e.currentTarget.index);
    // TODO: show dialog to let user select which segment type to add
    // TODO: after add segment enter an element edit state and give user option to save/cancel, and prompt for save if closing element (cache unsaved changes to user's account)
  }

  _addSegmentVariation(e) {
    var detail = e.detail
    var index = this._getIndex(detail.segment);
    if (index === null) return;

    var data = detail.data
    // TODO: prompt user for reason to add variation
    // TODO: if prompt successful (not cancelled) insert variation to current variation index, update segment's data, and exit edit mode
  }

  _editingChanged(e) {
    // ignore update if segment not really changing editing state
    var detail = e.detail
    if (detail.value === (this.editingSegmentId === detail.segment.id)) return;

    var segments = this.segments;
    var components = this.$.container.children;
    if (detail.value) {
      // editing
      var segmentId = detail.segment.id;
      this.editingSegmentId = segmentId;
      for (var i = 0; i < segments.length; i++) {
        var segment = segments[i];
        if (segment.id !== segmentId) {
          var component = components[i * 2 + 1];
          if (component.editing) {
            component.set('editing', false);
          }
        }
      }
    } else {
      // not editing
      this.editingSegmentId = undefined;
    }
    for (var i = 0; i <= segments.length; i++) {
      var component = components[i * 2];
      if (!this.editingSegmentId || this.editingSegmentId < 0) {
        component.setAttribute('hidden', 'true');
      } else {
        component.removeAttribute('hidden');
      }
    }
  }

  _getIndex(segment) {
    var segmentId = segment.id;
    var segments = this.segments;
    for (var i = 0; i < segments.length; i++) {
      if (segments[i].id === segmentId) {
        return i;
      }
    }
    return null;
  }

  _deleteTapped(e) {
    var detail = e.detail
    var index = this._getIndex(detail.segment);
    if (index === null) return;

    this.splice('segments', index, 1);
    if (this.segmentIds && index < this.segmentIds.length) {
      this.splice('segmentIds', index, 1);
    } else {
      this._segmentIdsChanged(this.segmentIds);
    }
  }

  _moveUpTapped(e) {
    var detail = e.detail
    var index = this._getIndex(detail.segment);
    if (index === null || index <= 0) return;

    this.__swapSegments(index, index - 1);
  }

  _moveDownTapped(e) {
    var detail = e.detail
    var index = this._getIndex(detail.segment);
    if (index !== null || index >= this.segments.length - 1) return;

    this.__swapSegments(index, index + 1);
  }

  __swapSegments(i1, i2) {
    if (i1 == i2) return;

    if (i1 > i2) {
      var temp = i1;
      i1 = i2;
      i2 = temp;
    }

    var temp = this.segments[i1];
    this.segments[i1] = this.segments[i2];
    this.segments[i2] = temp;
    if (this.segmentIds && i2 < this.segmentIds.length) {
      temp = this.segmentIds[i1];
      this.segmentIds[i1] = this.segmentIds[i2];
      this.segmentIds[i2] = temp;
    }
    this._segmentIdsChanged(this.segmentIds);
  }

  _segmentsChanged(segments) {
    // clear segments
    var root = this.$.container;
    var child;
    while (child = root.firstChild) {
      this._removeElement(root, child);
    }
    this.editingSegmentId = undefined;
    this._segmentIdsChanged(this.segmentIds);
    // TODO: enter an element edit state and give user option to save/cancel, and prompt for save if closing element (cache unsaved changes to user's account)
  }

  _addElement(parent, name, properties, beforeChild) {
    var element = document.createElement(name);
    this.__updateListeners(element, element.addEventListener);
    for (var key in properties) {
      if (properties.hasOwnProperty(key)) {
        element.set(key, properties[key]);
      }
    }
    if (this.editingSegmentId && properties.segment && this.editingSegmentId === properties.segment.id) {
      element.set('editing', true);
    }
    if (beforeChild) {
      parent.insertBefore(element, beforeChild);
    } else {
      parent.appendChild(element);
    }
    return element;
  }

  _removeElement(parent, element) {
    this.__updateListeners(element, element.removeEventListener);
    parent.removeChild(element);
  }

  __ensureHasPlusButton(parent, elementIndex, segmentContainerElement) {
    // even numbers should be + button, not segment containers
    if (elementIndex % 2 !== 0) return false;

    var properties = {
      index: elementIndex,
      icon: 'add-circle',
      title: 'Add Segment',
    };
    var button = this._addElement(parent, 'paper-icon-button', properties, segmentContainerElement);
    if (!this.editingSegmentId || this.editingSegmentId < 0) {
      button.setAttribute('hidden', 'true');
    }

    return true;
  }

  __addSegmentContainer(parent, index, beforeChild) {
    var properties = {
      segment: this.segments[index],
      variationId: this.segmentIds && index < this.segmentIds.length ? this.segmentIds[index] : 0,
      firstSegment: (index == 0),
      lastSegment: (index == this.segments.length - 1),
    };
    return this._addElement(parent, 'ctree-segment-container', properties, beforeChild);
  }

  _segmentIdsChanged(segmentIds) {
    if (!this.segments) return;

    var segments = this.segments;
    var root = this.$.container;
    var children = root.children;
    var childIndex = 0;

    var previousChildWasButton = false;
    for (var i = 0; i < segments.length; i++) {
      var segment = segments[i];
      var added = false;
      while (!added && childIndex < children.length) {
        var child = children[childIndex];
        if (child.tagName === 'CTREE-SEGMENT-CONTAINER') {
          var childId = child.segment.id;
          if (childId === segment.id) {
            if (this.__ensureHasPlusButton(root, childIndex, child)) {
              childIndex++;
            }
            child.set('firstSegment', i == 0);
            child.set('lastSegment', i == segments.length - 1);
            childIndex++;
            added = true;
          } else {
            // no match, check if child should be removed
            var remove = true;
            for (var j = i + 1; j < segments.length; j++) {
              if (segments[j].id === childId) {
                remove = false;
                break;
              }
            }
            if (remove) {
              this._removeElement(root, child);
            } else {
              for (var j = childIndex + 1; j < children.length; j++) {
                var testChild = children[j];
                if (child.tagName === 'CTREE-SEGMENT-CONTAINER' && child.segment.id === segment.id) {
                  added = true;
                  this._removeElement(root, testChild);
                  root.insertBefore(testChild, child);
                  child = testChild;
                  testChild = children[j];
                  if (testChild.tagName !== 'CTREE-SEGMENT-CONTAINER') {
                    // remove + button before moved element, will add back later
                    this._removeElement(root, testChild);
                  }
                  break;
                }
              }
              if (!added) {
                // not found later, add new child
                child = this.__addSegmentContainer(root, i, child);
                added = true;
              }
              // can't remove child (used later), look for segment in later child
              if (this.__ensureHasPlusButton(root, childIndex, child)) {
                childIndex++;
              }
              childIndex++;
            }
          }
          if (added) {
            previousChildWasButton = false;
          }
        } else {
          // child is + button
          if (previousChildWasButton) {
            // multiple + buttons in a row aren't allowed
            this._removeElement(root, child);
          } else {
            // update index
            child.index = childIndex;
            childIndex++
            previousChildWasButton = true;
          }
        }
      }
      if (!added) {
        // reached end of children without adding, so add to end
        if (this.__ensureHasPlusButton(root, childIndex)) {
          childIndex++;
        }
        this.__addSegmentContainer(root, i);
        previousChildWasButton = false;
        childIndex++;
      }
    }

    // remove trailing children
    while (childIndex < children.length) {
      var child = children[childIndex];
      if (child.tagName === 'ctree-segment-container' || previousChildWasButton) {
        this._removeElement(root, child);
      } else {
        previousChildWasButton = true;
        child.index = childIndex;
        childIndex++;
      }
    }

    // ensure ends with + button
    if (!previousChildWasButton) {
      this.__ensureHasPlusButton(root, children.length);
    }
  }
}

// Register custom element definition using standard platform API
customElements.define(CTreeDescription.is, CTreeDescription);
