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

class CTreeUserDialogAccessor extends PolymerElement {

  static get is() { return 'ctree-user-dialog-accessor'; }

  static get properties() {
    return {
      /**
       * The unique key identifying a cTree.  If the site only has one cTree
       * this doesn't need to be set.
       */
      ctreeKey: String,

      /**
       * User data
       *
       * Structure:
       *   {
       *   }
       */
      user: Object,

      page: String,

      _dialog: Object,
    };
  }

  open() {
    if (!this._dialog) {
      var dialogs = document.getElementsByTagName('ctree-dialogs');
      if (dialogs.length < 1) {
        importHref(this.resolveUrl(document.createElement('iron-meta').byKey('rootPath') + '/src/ctree-dialogs/ctree-dialogs.html'),
            () => this._addDialogInternal(loadEvent),
            null,
            true /* true for async */);
      } else {
        if (dialogs.length > 1) {
          console.warn('Multiple ctree-dialogs tags found. Using first occurrence.');
        }
        this._dialog = dialogs[0];
        this._openInternal();
      }
    } else {
      this._openInternal();
    }
  }

  _addDialogInternal() {
    this._dialog = document.createElement('ctree-dialogs');
    document.getElementsByTagName('body')[0].appendChild(this._dialog);
    this._openInternal();
  }

  _openInternal() {
    // TODO: initialize values & listeners
    if (this._dialog.dialog !== 'user') {// TODO: check open dialog
      this._dialog.user = this.user;
      this._dialog.page = this.page;
      this._dialog.openUserDialog();
    }
  }
}

// Register custom element definition using standard platform API
customElements.define(CTreeUserDialogAccessor.is, CTreeUserDialogAccessor);
