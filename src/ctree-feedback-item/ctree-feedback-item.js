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
/* internal */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '../ctree-dialogs/ctree-user-dialog-accessor.js';
import '../ctree-feedback-bar/ctree-feedback-bar.js';
import '../ctree-icons/ctree-icons.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
class CTreeFeedbackItem extends mixinBehaviors([IronResizableBehavior], PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
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
      /* TODO: there's probably a bug with paper-icon-button that needs to be fixed  */
      paper-icon-button[hidden] {
        display: none;
      }
    </style>

    <ctree-user-dialog-accessor id="userDialog"></ctree-user-dialog-accessor>

    <div id="sentiment">
      <paper-button id="avatar" title="Username" on-tap="_userClicked" raised=""></paper-button>
      <paper-icon-button id="thumbs-up" icon="thumbs-up" title="liked" hidden\$="[[!_equals(sentiment, 1)]]"></paper-icon-button>
      <paper-icon-button id="thumbs-down" icon="thumbs-down" title="disliked" hidden\$="[[!_equals(sentiment, -1)]]"></paper-icon-button>
    </div><div id="feedback">
      <div id="content" hidden="true"></div>
      <div id="comment">[[comment]]</div>
      <ctree-feedback-bar on-feedback-tapped="_commentTapped"></ctree-feedback-bar>
      <ctree-feedback-entry id="userComment" hidden\$="[[!_commenting]]"></ctree-feedback-entry>
    </div>
`;
  }

  static get is() { return 'ctree-feedback-item'; }

  /**
   * Fired when a the feedback button is tapped.
   *
   * @event feedback-tapped
   * @param {{segment: segmentData}} detail Contains data for segment whos feedback button was tapped.
   */

  static get properties() {
    return {
      item: {
        type: Object,
        observer: '_itemChanged',
      },

      depth: {
        type: Number,
        observer: '_depthChanged',
      },

      sentiment: Number,

      comment: String,

      // TODO: we probalby need to reset this whenever the item is changed (listen for ID or other handle change)
      // TODO: store entered (but not submitted) comment by ID and clear it so list recycling works correctly
      _commenting: {
        type: Boolean,
        value: false,
      },

      _offset: Number,
    };
  }

  ready() {
    super.ready();

    this.addEventListener('iron-resize', e => this._onSizeChanged(e));
  }

  _equals(v1, v2) {
    return v1 === v2;
  }

  _userClicked(e) {
    // TODO: populate with user data
    this.$.userDialog.open();
  }

  _commentTapped() {
    this._commenting = !this._commenting;
    setTimeout(() => this.notifyResize(), 1);
  }

  _itemChanged(newItem, oldItem) {
    // TODO: get user comment store/restore working
    if (oldItem) {
      // store comment in progress
      oldItem.commenting = this._commenting;
      //oldItem.comment = this.$.userComment.comment;
    }
    this._commenting = newItem.commenting;
    //this.$.userComment.comment = newItem.comment;
    // TODO: if item has content populate it, otherwise hide content div
  }

  _onSizeChanged() {
    this._depthChanged(this.depth);
  }

  _depthChanged(depth) {
    var sentiment = this.$.sentiment;
    var sentimentWidth = sentiment.offsetWidth;
    var offset = Math.min(depth * sentimentWidth * 3 / 4, this.offsetWidth / 4);
    if (offset != this._offset) {
      this._offset = offset;
      sentiment.style.marginLeft = offset + 'px';
      this.$.feedback.style.width = 'calc(100% - ' + (sentimentWidth + 8 + offset) + 'px)';
    }
  }
}

// Register custom element definition using standard platform API
customElements.define(CTreeFeedbackItem.is, CTreeFeedbackItem);
