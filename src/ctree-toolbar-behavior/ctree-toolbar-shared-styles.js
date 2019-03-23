import '@polymer/polymer/polymer-legacy.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="ctree-toolbar-shared-styles">
  <template>
    <style>
      .toolbar {
        --paper-toolbar-height: 56px;
        --paper-toolbar-sm-height: 56px;
        --paper-toolbar-padding: 8px; /* should recommend support for in paper-toolbar */

        background-color: black;
        color: white;
        padding: 0 !important;
      }
      .toolbar .title {
        margin-left: 8px !important;
      }
      paper-icon-button[hidden] {
        display: none !important;
      }
      .toolbar #close {
        display: none;
      }
      @media (max-width: 400px) {
        .toolbar #close {
          display: inline-block;
        }
        .toolbar #close[hidden] {
          display: none;
        }
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

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
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;
