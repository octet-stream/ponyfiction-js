import bind from "core/helper/graphql/normalizeParams"
import Forbidden from "core/error/http/Forbidden"
import NotFound from "core/error/http/NotFound"
import auth from "core/auth/checkUser"
import conn from "core/db/connection"

import Story from "model/Story"
import Chapter from "model/Chapter"
import Collaborator from "model/Collaborator"

import getChapterAbilities from "acl/chapter"
import getCommonAbilities from "acl/common"

const include = [{model: Story, as: "story", required: true}]

const chapterUpdate = ({args, ctx}) => conn.transaction(async transaction => {
  const {user} = ctx.state
  const {id, ...fields} = args.chapter

  const chapter = await Chapter.findByPk(id, {include, transaction})

  if (!chapter) {
    throw new NotFound("Can't find requested chapter.")
  }

  const collaborator = await Collaborator.findOne({
    where: {userId: user.id, storyId: chapter.story.id}
  })

  const aclCommon = getCommonAbilities(user)
  const aclChapter = getChapterAbilities({user, collaborator})

  // Check abilities for story and chapter
  if (
    aclCommon.cannot("update", chapter) && aclChapter.cannot("update", chapter)
  ) {
    throw new Forbidden("You have no access to update this chapter.")
  }

  return chapter.update(fields, {transaction})
    .then(() => chapter.reload({transaction}))
})

export default chapterUpdate |> auth |> bind
