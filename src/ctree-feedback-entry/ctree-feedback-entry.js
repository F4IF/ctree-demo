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

import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-input/paper-textarea.js';
import '../ctree-icons/ctree-icons.js';
import '../ctree-icons/type-icons.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class CTreeFeedbackEntry extends mixinBehaviors([IronResizableBehavior], PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none !important;
      }
      #sentiment {
        display: inline-block;
        vertical-align: top;
        text-align: center;
        width: 36px;
        padding: 8px;
      }
      #avatar {
        display: block;
        margin: auto;
        min-width: 36px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: url(../../images/no-avatar.png);
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position: center;
      }
      #feedback {
        display: inline-block;
        vertical-align: top;
        text-align: right;
        width: calc(100% - 60px);
        padding: 8px 8px 8px 0;
      }
      #comment {
        text-align: left;
      }
      #submit {
        background-color: var(--paper-indigo-500);
        color: white;
        --paper-button-raised-keyboard-focus: {
          background-color: var(--paper-pink-a200) !important;
          color: white !important;
        };
      }
    </style>

    <div id="sentiment">
      <div id="avatar" title="Username"></div>
      <paper-icon-button id="thumbs-up" icon="thumbs-up" title="like"></paper-icon-button>
      <paper-icon-button id="thumbs-down" icon="thumbs-down" title="dislike"></paper-icon-button>
    </div><div id="feedback">
      <!-- TODO: create new component which lists buttons and puts buttons which won't fit in a dialog accessible via an overflow button -->
      <div id="content-bar">
        <paper-icon-button id="content-file" icon="type:file" title="File"></paper-icon-button>
        <paper-icon-button id="content-link" icon="type:link" title="External Link"></paper-icon-button>
        <paper-icon-button id="content-audio" icon="type:audio" title="Audio"></paper-icon-button>
        <paper-icon-button id="content-video" icon="type:video" title="Video"></paper-icon-button>
        <paper-icon-button id="content-image" icon="type:image" title="Image"></paper-icon-button>
        <paper-icon-button id="content-quote" icon="type:quote" title="Quote"></paper-icon-button>
        <paper-icon-button id="content-chart" icon="type:chart" title="Chart"></paper-icon-button>
        <paper-icon-button id="content-study" icon="type:study" title="Study"></paper-icon-button>
        <paper-icon-button id="content-element" icon="type:element" title="Element"></paper-icon-button>
      </div>
      <div id="content" hidden=""></div>
      <paper-textarea id="comment" label="Comment" on-value-changed="_onCommentChanged" no-label-float=""></paper-textarea>
      <paper-button id="submit" raised="">Submit</paper-button>
    </div>
`;
  }

  static get is() { return 'ctree-feedback-entry'; }

  /**
   * Fired when a the feedback button is tapped.
   *
   * @event feedback-tapped
   * @param {{segment: segmentData}} detail Contains data for segment whos feedback button was tapped.
   */

  static get properties() {
    return {
      _savedHeight: Number,
    };
  }

  ready() {
    super.ready();

    this.addEventListener('iron-resize', e => this._onSizeChange(e));
  }

  attached() {
    setTimeout(() => this.notifyResize(), 1);
  }

  _fireFeedbackTapped() {
    // TODO: figure out segment data & pass as detail segmentData
    this.dispatchEvent(new CustomEvent('feedback-tapped', {detail: {segmentData: {}}, bubbles: true, composed: true}));
  }

  _onSizeChange() {
    this.savedHeight = this.offsetHeight;
  }

  _onCommentChanged() {
    if (this.offsetHeight !== this.previousHeight) {
      setTimeout(() => this.notifyResize(), 1);
    }
  }
}

// Register custom element definition using standard platform API
customElements.define(CTreeFeedbackEntry.is, CTreeFeedbackEntry);
