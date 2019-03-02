/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   import-data-inspector.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {PolymerElement} from '@polymer/polymer/polymer-element.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

export {ImportDataInspector};

declare namespace UiElements {

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
   */
  class ImportDataInspector extends PolymerElement {

    /**
     * Imported data.
     */
    data: object|null|undefined;

    /**
     * Computed headers-sets value
     */
    headersSets: any[]|null|undefined;

    /**
     * Computed auth-data value
     */
    authData: any[]|null|undefined;

    /**
     * Computed url-history value
     */
    urls: any[]|null|undefined;

    /**
     * Computed websocket-url-history value
     */
    socketUrls: any[]|null|undefined;

    /**
     * Handles the cancel action.
     */
    _cancel(): void;

    /**
     * Updates local variables that can't be read in the template.
     */
    _dataUpdated(data: any): void;

    /**
     * Handles "import" action.
     */
    _import(): void;

    /**
     * Collects information about selected data in the data table.
     *
     * @param name Data table element name to check data for.
     * @returns List of items or undefined if the table is
     * not in the DOM, the table is hidden or selection is empty.
     */
    _getTableData(name: String|null): any[]|null|undefined;

    /**
     * Collects import data from the tables.
     * Only selected items are in the final object.
     *
     * @returns ARC import object with updated arrays.
     * Note, the object is a shallow copy of the original data object.
     */
    collectData(): object|null;
  }
}

declare global {

  interface HTMLElementTagNameMap {
    "import-data-inspector": UiElements.ImportDataInspector;
  }
}
