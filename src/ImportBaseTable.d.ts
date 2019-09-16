/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   src/ImportBaseTable.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {LitElement, html} from 'lit-element';

export {ImportBaseTable};

declare namespace UiElements {

  /**
   * Base table class. Contains methods and templates to be
   * used by other tables.
   *
   * In most canses child classes should only define their own `itemBodyTemplate`
   * property that is insterted into `<anypoint-item-body>` element.
   */
  class ImportBaseTable extends
    ImportTableMixin(
    LitElement) {
    readonly hasSelection: Boolean|null;

    /**
     * The data to display.
     */
    data: any[]|null|undefined;
    readonly list: any;
    readonly selectedItems: any;
    readonly headerTemplate: any;
    readonly tableHeaderTemplate: any;
    readonly contentTemplate: any;

    /**
     * Title of the table when using base tabel
     */
    tableTitle: string|null|undefined;

    /**
     * Indicates if the table is displaying list of items
     */
    opened: boolean|null|undefined;

    /**
     * List of IDs of selected items.
     */
    selectedIndexes: Array<String|null>|null;

    /**
     * True to select all elements from the list
     */
    allSelected: boolean|null|undefined;

    /**
     * Enables compatibility with Anypoint platform
     */
    compatibility: boolean|null|undefined;
    constructor();
    firstUpdated(): void;
    render(): any;

    /**
     * Toggles opened state
     */
    toggleOpened(): void;
    _createSelectionArray(items: any): any;
    _dataChanged(data: any): void;
    setSelected(values: any): void;
    _selectedHandler(e: any): void;
    _toggleSelectAll(e: any): void;
    _itemBodyContentTemplate(item: any, index: any): any;
    _itemBodyTemplate(item: any, index: any): any;
    repeaterTemplate(data: any): any;
  }
}
