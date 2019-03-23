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
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class CTreeFeedbackBar extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      .rating {
        display: inline-block;
        font-weight: bold;
        font-size: large;
        padding-right: 4px;
      }
      .count {
        display: inline-block;
        vertical-align: text-bottom;
      }
    </style>

    <div class="rating"><div class="count">30</div><paper-icon-button id="thumbs-up" icon="thumbs-up" title="like"></paper-icon-button></div>
    <div class="rating"><div class="count">40</div><paper-icon-button id="thumbs-down" icon="thumbs-down" title="dislike"></paper-icon-button></div>
    <paper-icon-button id="comment" icon="comment" title="comment" on-tap="_fireFeedbackTapped"></paper-icon-button>
`;
  }

  static get is() { return 'ctree-feedback-bar'; }

  /**
   * Fired when a the feedback button is tapped.
   *
   * @event feedback-tapped
   * @param {{segment: segmentData}} detail Contains data for segment whos feedback button was tapped.
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
      },
    };
  }

  _fireFeedbackTapped() {
    this.dispatchEvent(new CustomEvent('feedback-tapped', {detail: {segment: this.segment}, bubbles: true, composed: true}));
  }
}

// Register custom element definition using standard platform API
customElements.define(CTreeFeedbackBar.is, CTreeFeedbackBar);
