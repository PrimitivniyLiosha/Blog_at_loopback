module.exports = (Comment) => {
  Comment.beforeRemote('create', async (ctx, next) => {
    if (ctx.args.data.commentId) {
      const comment = await Comment.findById(ctx.args.data.commentId);
      if (comment.commentId) {
        let error = new Error();
        error.status = 412;
        error.message = 'You can`t write more than one comment to two levels coments';
        throw error;
      }
    }
  });
};