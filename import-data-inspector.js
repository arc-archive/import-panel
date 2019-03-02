/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@advanced-rest-client/date-time/date-time.js';
import '@polymer/paper-button/paper-button.js';
import './import-requests-table.js';
import './import-history-table.js';
import './import-variables-table.js';
import './import-headers-sets-table.js';
import './import-cookies-table.js';
import './import-auth-data-table.js';
import './import-url-history-table.js';
import './import-websocket-url-history-table.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * An element to display tables of import data.
 *
 * It accept normalized ARC import object received from `arc-data-import`
 * element.
 *
 * ### Example
 *
 * ```html
 * <import-data-inspector
 *  data="[[arcImport]]"
 *  on-cancel="cancel"
 *  on-import="importData"></import-data-inspector>
 * ```
 *
 * ### Styling
 * `<import-panel>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--import-data-inspector` | Mixin applied to the element | `{}`
 * `--action-button` | Mixin applied to the primary acction button | `{}`
 * `--import-data-inspector-meta-color` | Color of the meta data property | `{}`
 * `--import-table` | Mixin applied to a table with data import | `{}`
 * `--import-table-opened` | Mixin applied to a table with data import when opened | `{}`
 * `--import-table-title` | Mixin applied to the title of the import table | `{}`
 * `--import-table-header` | Mixin applied to data table header with selecyion options | `{}`
 * `--import-table-method-label` | Mixin applied to the HTTP method label container | `{}`
 * `--import-table-selection-counter` | Mixin applied to a table selection counter label | `{}`
 * `--import-table-list-item` | Mixin applied to data table's items | `{}`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof UiElements
 */
export class ImportDataInspector extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      padding-bottom: 64px;
      @apply --arc-font-body1;
      @apply --import-data-inspector;
    }

    paper-button {
      color: var(--import-panel-action-button, var(--primary-color));
    }

    .primary-action {
      @apply --action-button;
    }

    .meta {
      color: var(--import-data-inspector-meta-color, rgba(0, 0, 0, 0.74));
      margin-bottom: 24px;
    }

    .form-actions {
      @apply --layout-flex;
      @apply --layout-end-justified;
      @apply --layout-horizontal;
    }
    </style>
    <template is="dom-if" if="[[data.createdAt]]">
      <p class="meta">Exported at:
        <date-time year="numeric" month="long" day="numeric" hour="2-digit"
        minute="2-digit" second="2-digit" date="[[data.createdAt]]"></date-time> from ARC version: [[data.version]]</p>
    </template>

    <template is="dom-if" if="[[data.requests.length]]">
      <import-requests-table data="[[data.requests]]" projects="[[data.projects]]"></import-requests-table>
    </template>

    <template is="dom-if" if="[[data.history.length]]">
      <import-history-table table-title="History" data="[[data.history]]"></import-history-table>
    </template>

    <template is="dom-if" if="[[data.variables.length]]">
      <import-variables-table table-title="Variables" data="[[data.variables]]"></import-variables-table>
    </template>

    <template is="dom-if" if="[[headersSets.length]]">
      <import-headers-sets-table table-title="Headers sets" data="[[headersSets]]"></import-headers-sets-table>
    </template>

    <template is="dom-if" if="[[data.cookies.length]]">
      <import-cookies-table table-title="Cookies" data="[[data.cookies]]"></import-cookies-table>
    </template>

    <template is="dom-if" if="[[authData.length]]">
      <import-auth-data-table table-title="Authorization data" data="[[authData]]"></import-auth-data-table>
    </template>

    <template is="dom-if" if="[[urls.length]]">
      <import-url-history-table table-title="URL history for autocomplete" data="[[urls]]"></import-url-history-table>
    </template>

    <template is="dom-if" if="[[socketUrls.length]]">
      <import-websocket-url-history-table
        table-title="Web socket URL history for autocomplete"
        data="[[socketUrls]]"></import-websocket-url-history-table>
    </template>

    <section class="form-actions">
      <paper-button on-click="_cancel" data-action="cancel-import">Cancel</paper-button>
      <paper-button class="primary-action" on-click="_import" data-action="import-data">Import data</paper-button>
    </section>
`;
  }

  static get properties() {
    return {
      // Imported data.
      data: {type: Object, observer: '_dataUpdated'},
      // Computed headers-sets value
      headersSets: Array,
      // Computed auth-data value
      authData: Array,
      // Computed url-history value
      urls: Array,
      // Computed websocket-url-history value
      socketUrls: Array
    };
  }
  // Handles the cancel action.
  _cancel() {
    this.dispatchEvent(new CustomEvent('cancel', {
      composed: true
    }));
  }
  // Updates local variables that can't be read in the template.
  _dataUpdated(data) {
    data = data || {};
    let value = data['headers-sets'];
    this.headersSets = (value && value.length) ? value : undefined;

    value = data['auth-data'];
    this.authData = (value && value.length) ? value : undefined;

    value = data['url-history'];
    this.urls = (value && value.length) ? value : undefined;

    value = data['websocket-url-history'];
    this.socketUrls = (value && value.length) ? value : undefined;
  }
  // Handles "import" action.
  _import() {
    const data = this.collectData();
    this.dispatchEvent(new CustomEvent('import', {
      composed: true,
      detail: data
    }));
  }

  /**
   * Collects information about selected data in the data table.
   *
   * @param {String} name Data table element name to check data for.
   * @return {Array|undefined} List of items or undefined if the table is
   * not in the DOM, the table is hidden or selection is empty.
   */
  _getTableData(name) {
    const table = this.shadowRoot.querySelector(name);
    if (!table) {
      return;
    }
    if (table.style.display === 'none') {
      return;
    }
    const selected = table.selectedItems;
    if (!selected || !selected.length) {
      return;
    }
    selected.forEach((item) => {
      delete item.selected;
    });
    return selected;
  }
  /**
   * Collects import data from the tables.
   * Only selected items are in the final object.
   *
   * @return {Object} ARC import object with updated arrays.
   * Note, the object is a shallow copy of the original data object.
   */
  collectData() {
    const result = Object.assign({}, this.data);
    result.requests = this._getTableData('import-requests-table');
    if (!result.requests && result.projects) {
      delete result.projects;
    }
    result.history = this._getTableData('import-history-table');
    result.variables = this._getTableData('import-variables-table');
    result.cookies = this._getTableData('import-cookies-table');
    result['headers-sets'] = this._getTableData('import-headers-sets-table');
    result['auth-data'] = this._getTableData('import-auth-data-table');
    result['url-history'] = this._getTableData('import-url-history-table');
    result['websocket-url-history'] = this._getTableData('import-websocket-url-history-table');
    return result;
  }
  /**
   * Fired when the user accepts the import
   * Event's detail object is ARC import data object.
   *
   * The event does not bubbles.
   *
   * @event import
   */
  /**
   * Fired when the user cancels the import action.
   *
   * The event does not bubbles.
   *
   * @event cancel
   */
}
window.customElements.define('import-data-inspector', ImportDataInspector);