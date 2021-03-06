import {ObjectType, Field, Root, Int} from "type-graphql"

import UnwrapMethodsReturnType from "helper/type/UnwrapMethodsReturnType"

export interface PageParams<T extends object> {
  /**
   * Returns per-page entities limit
   */
  readonly limit: number

  /**
   * List offset
   */
  readonly offset: number

  /**
   * Current page number
   */
  readonly page: number

  /**
   * The number of the total rows in the list
   */
  readonly count: number

  /**
   * The list of entities
   */
  readonly rows: T[]
}

/**
 * This type alias reflect the Page result shape.
 * Use it when you need just the shape.
 */
export type PageResult<T extends object> =
  Readonly<UnwrapMethodsReturnType<Page<T>>>

@ObjectType({isAbstract: true})
export abstract class Page<T extends object> {
  /**
   * Returns total amount of rows in the list.
   */
  @Field(() => Int, {description: "Returns total amount of rows in the list."})
  readonly count!: number

  /**
   * Returns per-page entities limit.
   */
  @Field(() => Int, {description: "Returns per-page entities limit."})
  readonly limit!: number

  /**
   * List offset.
   */
  @Field(() => Int, {description: "List offset."})
  readonly offset!: number

  /**
   * Returns the number of the current page.
   */
  @Field(() => Int, {description: "Returns the number of the current page."})
  current(@Root() {page}: PageParams<T>): number {
    return page
  }

  /**
   * Indicates whether the list has next page or not.
   */
  @Field(() => Boolean, {description: "Indicates if the list has next page."})
  hasNext(@Root() {limit, page, count}: PageParams<T>): boolean {
    return count - limit * page > 0
  }

  /**
   * Returns the number of the last page.
   */
  @Field(() => Int, {description: "Returns the number of the last page."})
  last(@Root() {limit, page, count}: PageParams<T>): number {
    // The formula: `count / (limit * page)`
    // Where the `count` is the number of all matched rows in database,
    // the `limit` is the values of rows to display per page,
    // and the `page` is the number of the current page.
    return Math.ceil(count / (limit * page))
  }

  /**
   * Returns the list of entities.
   */
  abstract list(root: PageParams<T>): T[]
}

export default Page
