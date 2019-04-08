module.exports = (Article) => {
  Article.getCommentsToArticle = async (articleId) => {
    return await Article.findOne({
      where: { id: articleId },
      include: {
        relation: 'comments',
        scope: {
          include: [{ relation: 'posteriors' }]
        }
      }
    });
  };

  Article.remoteMethod('getCommentsToArticle', {
    description: 'get comments to article',
    accepts: { arg: 'articleId', type: 'String', required: true },
    returns: { arg: 'article', type: 'array' },
    http: { verb: 'get' }
  });
};