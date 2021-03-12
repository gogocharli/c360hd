import * as Queries from '../utils/queries';

/**
 * Defines an adapter between the database provider
 * and the rest of the application. This is done to scale
 * easier later as the current implementation is not flexible for
 * more complex use cases we'll encounter
 *
 * @see https://en.wikipedia.org/wiki/Adapter_pattern
 */
class DatabaseAdapter {
  private table: string;
  private Queries;

  constructor(table: string) {
    this.table = table;
    this.Queries = Queries;
  }

  /**
   * Retrieves database record from its identifier
   * @param id string
   */
  getRow(id: string) {
    return Queries.getRecordById(this.table, id);
  }

  /**
   * Retrieves data from all recrods in the table.
   * Optional array to retrieve specific fields from all records
   * @param fields string[]
   */
  all(query?: Queries.FilterOptions) {
    return Queries.getAllFromTable(this.table, query);
  }

  /**
   * Updates one or multiple records on the database
   * @param updates {{id: string, fields: any}}[]
   */
  updateRow(updates: { id: string; fields: any }[]) {
    return Queries.updateFields(this.table, updates);
  }

  /**
   * Create a new entry with the fields received as an argument
   * @param info any
   */
  createRow(info = {}) {
    return Queries.writeToTable(this.table, info);
  }

  deleteRow(...ids: string[]) {
    return Queries.deleteField(this.table, ...ids);
  }

  /**
   * Returns the name of the instantiated table
   */
  get name() {
    return this.table;
  }
}

const LinksTable = new DatabaseAdapter('Links');
const ClientsTable = new DatabaseAdapter('Clients');
const OrdersTable = new DatabaseAdapter('Orders');
const RepsTable = new DatabaseAdapter('Reps');
export {
  DatabaseAdapter as default,
  LinksTable,
  ClientsTable,
  OrdersTable,
  RepsTable,
};
