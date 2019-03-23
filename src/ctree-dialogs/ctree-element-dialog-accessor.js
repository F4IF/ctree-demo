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

import '@polymer/iron-meta/iron-meta.js';
import { importHref } from '@polymer/polymer/lib/utils/import-href.js';

class CTreeElementDialogAccessor extends PolymerElement {

  static get is() { return 'ctree-element-dialog-accessor'; }

  static get properties() {
    return {
      /**
       * The unique key identifying a cTree.  If the site only has one cTree
       * this doesn't need to be set.
       */
      ctreeKey: String,

      /**
       * Element data
       *
       * Structure:
       *   {
       *     id: Number,
       *     type: ElementType,
       *     title: String,
       *     parents: [Number],
       *     children: [Number],
       *     childrenSearchComplete: Boolean,
       *     designer: String,		// TODO: should probably be an object (user ID or reference to public user object)
       *     description: [{
       *       id: Number,
       *       contributors: [String],  // TODO: should probably be an object (user ID or reference to public user object)
       *       segments: [{
       *         id: Number,
       *         type: SegmentType,
       *         variations: [{
       *           id: Number,
       *           data: dynamic,	// data type depends on segment type
       *         }, ...],
       *       }, ...],
       *     }, ...],
       *     feedback: [{
       *       reviewer: String,	// TODO: should probably be an object (user ID or reference to public user object)
       *       text: String,
       *     }, ...],
       *     bookmarked: Boolean,
       *   }
       */
      element: Object,

      descriptionConfigId: Number,

      descriptionSegmentIds: Array,

      feedbackSegment: Number,

      historyContributor: Number,

      _dialog: Object,
    };
  }

  open() {
    if (!this._dialog) {
      importHref(this.resolveUrl(document.createElement('iron-meta').byKey('rootPath') + '/src/ctree-dialogs/ctree-dialogs.html'), () => {
        var dialogs = document.getElementsByTagName('ctree-dialogs');
        if (dialogs.length < 1) {
          this._dialog = document.createElement('ctree-dialogs');
          document.getElementsByTagName('body')[0].appendChild(this._dialog);
        } else {
          if (dialogs.length > 1) {
            console.warn('Multiple ctree-dialogs tags found. Using first occurrence.');
          }
          this._dialog = dialogs[0];
        }
        this.open();
      }, null, true);
    } else {
      // TODO: initialize values & listeners
      if (this._dialog.dialog !== 'element') {// TODO: check open dialog
        this._dialog.element = this.element;
        this._dialog.descriptionConfigId = this.descriptionConfigId;
        this._dialog.descriptionSegmentIds = this.descriptionSegmentIds;
        this._dialog.openElementDialog();
      }
    }
  }
}

// Register custom element definition using standard platform API
customElements.define(CTreeElementDialogAccessor.is, CTreeElementDialogAccessor);
