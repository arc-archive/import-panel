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
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@advanced-rest-client/arc-icons/arc-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@api-components/http-method-label/http-method-label.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-item/paper-item-body.js';
import './import-table-common-styles.js';
import {ImportTableMixin} from './import-table-mixin.js';
/**
 * An element to display list of request objects to import.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof UiElements
 * @appliesMixin ImportTableMixin
 */
export class ImportRequestsTable extends ImportTableMixin(PolymerElement) {
  static get template() {
    return html`<style include="import-table-common-styles">
    .selected-counter {
      margin-left: 32px;
    }

    .project-header {
      @apply --arc-font-headline;
      height: 48px;
      @apply --layout-horizontal;
      @apply --layout-center;
      padding-left: 12px;
    }

    .project-block {
      background-color: var(--import-table-title-request-project-background-color, #F5F5F5);
      margin-bottom: 12px;
    }
    </style>
    <div class="title" on-click="toggleOpened">
      <h3>Requests ([[selectedItems.length]])</h3>
      <paper-icon-button icon="arc:keyboard-arrow-down" class\$="toggle-icon [[_computeToggleClass(opened)]]"></paper-icon-button>
    </div>
    <iron-collapse opened="[[opened]]">
      <section class\$="table-options [[_computeTableClass(hasSelection)]]">
        <paper-checkbox class="select-all" checked="{{allSelected}}" title="Select / deselect all"></paper-checkbox>
        <span class="selected-counter hiddable">[[selectedItems.length]] item(s) selected</span>
      </section>
      <template is="dom-repeat" items="[[nonProjects]]" id="itemsRepeater">
        <div class="list-item" data-source="itemsRepeater">
          <paper-icon-item>
            <paper-checkbox checked="[[item.selected]]" slot="item-icon" aria-label\$="Select/Deselect [[item.url]]"></paper-checkbox>
            <span class="method-label">
              <http-method-label method="[[item.method]]"></http-method-label>
            </span>
            <paper-item-body two-line="">
              <div>[[item.name]]</div>
              <div secondary="">
                [[item.url]]
              </div>
            </paper-item-body>
          </paper-icon-item>
        </div>
      </template>
      <template is="dom-repeat" items="[[projectsData]]">
        <div class="project-block" data-project\$="[[item.projectId]]">
          <div class="project-header">Project: [[_computeProjectLabel(item.projectId, projects)]]</div>
          <template is="dom-repeat" items="[[item.requests]]" as="request">
            <div class="list-item" data-source\$="[[item.projectId]]">
              <paper-icon-item>
                <paper-checkbox checked="[[request.selected]]" slot="item-icon" aria-label\$="Select/Deselect [[request.url]]"></paper-checkbox>
                <span class="method-label">
                  <http-method-label method="[[request.method]]"></http-method-label>
                </span>
                <paper-item-body two-line="">
                  <div>[[request.name]]</div>
                  <div secondary="">
                    [[request.url]]
                  </div>
                </paper-item-body>
              </paper-icon-item>
            </div>
          </template>
        </div>
      </template>
    </iron-collapse>
    <array-selector id="selector" items="{{data}}" selected="{{selectedItems}}" multi="" toggle=""></array-selector>`;
  }
  static get properties() {
    return {
      // List of projects included in the import
      projects: Array,
      nonProjects: Array,
      projectsData: Array
    };
  }

  static get observers() {
    return [
      '_computeRequestsView(data)'
    ];
  }

  _computeRequestsView(data) {
    if (!data) {
      return;
    }
    let nonProjects = [];
    let projectsData = {};
    data.forEach((item) => {
      if (item.legacyProject) {
        if (item.legacyProject in projectsData) {
          projectsData[item.legacyProject].push(item);
        } else {
          projectsData[item.legacyProject] = [item];
        }
      } else if (item.projects && item.projects.length) {
        for (let i = 0, len = item.projects.length; i < len; i++) {
          if (item.projects[i] in projectsData) {
            projectsData[item.projects[i]].push(item);
          } else {
            projectsData[item.projects[i]] = [item];
          }
        }
      } else {
        nonProjects.push(item);
      }
    });
    this.set('nonProjects', nonProjects);
    projectsData = Object.keys(projectsData).map((id) => {
      return {
        projectId: id,
        requests: projectsData[id]
      };
    });
    this.set('projectsData', projectsData);
  }
  // Computes lable for a project
  _computeProjectLabel(id, list) {
    if (!id || !list || !list.length) {
      return '';
    }
    const project = list.find((item) => item._id === id);
    if (!project) {
      return '';
    }
    return project.name;
  }

  _onSelectItem(e) {
    const path = e.composedPath();
    if (path[0].localName === 'h3') {
      return;
    }
    let target;
    const root = this.shadowRoot;
    for (let i = 0; i < path.length; i++) {
      if (path[i].getRootNode() === root) {
        target = path[i];
        break;
      }
    }
    const source = this._findSource(path);
    if (!source) {
      return;
    }
    let selector;
    let itemKey;
    if (source !== 'itemsRepeater') {
      selector = '[data-project="' + source + '"] dom-repeat';
      itemKey = 'request';
    } else {
      selector = '#' + source;
      itemKey = 'item';
    }
    const repeater = this.shadowRoot.querySelector(selector);
    const model = repeater.modelForElement(target);
    if (!model) {
      return;
    }
    const item = model.get(itemKey);
    let state;
    if (this.$.selector.isSelected(item)) {
      this.$.selector.deselect(item);
      state = false;
    } else {
      this.$.selector.select(item);
      state = true;
    }
    model.set(itemKey + '.selected', state);
  }
  /**
   * Finds an element that has `data-source` attribute in the event path.
   *
   * @param {Array} path Event path.
   * @return {String} Value od the `data-source` attribute;
   */
  _findSource(path) {
    path = path || [];
    let source;
    while (true) {
      let current = path.shift();
      if (!current) {
        break;
      }
      if (!current.dataset || !current.dataset.source) {
        continue;
      }
      source = current.dataset.source;
      break;
    }
    return source;
  }
}
window.customElements.define('import-requests-table', ImportRequestsTable);