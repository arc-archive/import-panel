/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   import-url-history-table.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.

import {ImportBaseTable} from './import-base-table.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';

declare namespace UiElements {

  /**
   * An element to display list of URLs hsitory to import.
   */
  class ImportUrlHistoryTable extends
    ImportTableMixin(
    ImportBaseTable) {
  }
}

declare global {

  interface HTMLElementTagNameMap {
    "import-url-history-table": UiElements.ImportUrlHistoryTable;
  }
}
