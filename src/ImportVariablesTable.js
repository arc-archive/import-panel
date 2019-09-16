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
import { ImportBaseTable } from './ImportBaseTable.js';
import { html, css } from 'lit-element';
/**
 * An element to display list of variables to import.
 *
 * @customElement
 * @demo demo/index.html
 * @memberof UiElements
 * @extends {ImportBaseTable}
 */
export class ImportVariablesTable extends ImportBaseTable {
  static get styles() {
    return [
      ImportBaseTable.styles,
      css`.var-name {
        font-weight: 500;
      }

      .var-value {
        margin-left: 8px;
      }`
    ];
  }

  _itemBodyTemplate(item) {
    return html`<div>
      <span class="var-name">${item.variable}</span>:
      <span class="var-value">${item.value}</span>
    </div>
    <div secondary>
      Environment: ${item.environment}
    </div>`;
  }

  _itemBodyContentTemplate(item) {
    return html`<anypoint-item-body twoline>
      ${this._itemBodyTemplate(item)}
    </anypoint-item-body>`;
  }
}
