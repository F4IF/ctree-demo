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

class CTreeImport extends PolymerElement {

  static get is() { return 'ctree-import'; }

  static get properties() {
    return {
      href: {
        type: String,
        observer: '_hrefChanged',
      },

      loading: {
        type: Boolean,
        notify: true,
        observer: '_loadingChanged',
      },

      loaded: {
        type: Boolean,
        notify: true,
        readOnly: true,
      },
    };
  }

  load() {
    if (!this.loading && !this.loaded) {
      this.loading = true;
    }
  }

  _hrefChanged() {
    this.loading = false;
    this._setLoaded(false);
  }

  _loadingChanged(loading, previousLoading) {
    if (!loading || previousLoading) return;

    if (!this.href || this.href.length === 0) {
      this.loading = false;
    } else {
      var href = this.href;
      importHref(this.resolveUrl(document.createElement('iron-meta').byKey('rootPath') + href), () => {
        if (this.href === href) {
          this._setLoaded(true);
          this.loading = false;
        }
      }, () => {
        this.loading = false;
      }, true);
    }
  }
}

// Register custom element definition using standard platform API
customElements.define(CTreeImport.is, CTreeImport);
