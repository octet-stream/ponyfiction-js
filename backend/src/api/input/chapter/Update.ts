import {InputType, Field} from "type-graphql"

import Node from "api/input/common/Node"

@InputType()
class ChapterUpdateInput extends Node {
  @Field({nullable: true})
  title?: string

  @Field(() => String, {nullable: true})
  description?: string | null

  @Field({nullable: true})
  text?: string

  @Field({nullable: true})
  isDraft?: boolean
}

export default ChapterUpdateInput
