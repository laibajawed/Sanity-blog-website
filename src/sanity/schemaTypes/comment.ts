// schemas/comment.js
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
    }),
    defineField({
      name: 'postedAt',
      title: 'Posted At',
      type: 'datetime',
    }),
      defineField({
          name: "post",
          title: "Post",
          type: "reference",
          to: [{ type: "post" }],
          validation: (Rule) => Rule.required(),
      }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "content",
        },
    },
});
