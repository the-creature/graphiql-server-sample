import { first, get } from "lodash";
import moment from "moment";
import { Ordering } from "../gen/schema-type-def";

export default class BaseModel {
  constructor(
    public db: any,
    protected tableName: string = "",
    protected alias: string = ""
  ) {}

  get select() {
    const fromClause = this.tableName + (this.alias ? ` as ${this.alias}` : "");
    return this.db(fromClause);
  }

  getMonthDateRange(year: number, month: number) {
    const startDate = moment([year, month]);
    return {
      startDate,
      endDate: moment(startDate).endOf("month")
    };
  }

  public getAll(sort?: Ordering) {
    const sortBy = get(sort, "field", "id");
    const sortDir = get(sort, "direction", "ASC");
    return this.select.orderBy(sortBy, sortDir);
  }

  public getById(id: string) {
    // NOTE: ! works because the only false string value, '', should fail
    if (!id) throw new Error(`required id argument was ${id}`);
    return (
      this.select
        // NOTE: ${this.tableName}.id in case we join other tables with ID columns
        .where({ [`${this.alias || this.tableName}.id`]: id })
        .then(first)
    );
  }

  /**
   * Updates (either via update or insert, depending on whether the provided
   * input as an ID or not) the provided object in the database.
   *
   * @param input a GraphQL *Input object with the values to create/update
   * @returns Promise<String> promise which resolves with the object's ID
   */
  public save(input: any) {
    const { id } = input;
    return this.db(this.tableName)
      [id ? "update" : "insert"](input)
      .where(id ? { id } : {})
      .returning("id")
      .then(([dbId]: [string]) => [dbId || id]);
  }

  public remove(id: string) {
    if (!id) throw new Error(`required id argument was ${id}`);
    return (
      this.db(this.tableName)
        // NOTE: ${this.tableName}.id in case we join other tables with ID columns
        .where({ [`${this.alias || this.tableName}.id`]: id })
        .del()
        .then(() => id)
    );
  }
}
