 /**
 * 文章分类信息业务操作
 */
const articleCategoryModel = require('./../models/article_category')
const articleCategoryCode = require('../codes/article_category')

const articleCategory = {

  /**
   * 获取文章分类列表
   * @return {object} result 查询结果
   */
  async getArticleCategory () {
    let result = {
      success: false,
      message: ''
    }

    let categories = await articleCategoryModel.getCategory()
    if (!categories) {
      result.message = articleCategoryCode.FAIL_ARTICLE_CATEGORY_READ
      return result
    }

    categories = categories.map((item) => {
      return {
        value: item.id,
        name: item.name
      }
    })

    result.success = true
    result.message = articleCategoryCode.SUCCESS_ARTICLE_CATEGORY_READ
    result.data = categories

    return result
  },

  /**
   * 获取文章分类统计信息
   * @return {object} result 查询结果
   */
  async getArticleCategoryStatistics () {
    let result = {
      success: false,
      message: ''
    }

    let categories = await articleCategoryModel.getCategoryStatistics()
    if (!categories) {
      result.message = articleCategoryCode.FAIL_ARTICLE_CATEGORY_STATISTICS_READ
      return result
    }

    result.success = true
    result.message = articleCategoryCode.SUCCESS_ARTICLE_CATEGORY_STATISTICS_READ
    result.data = categories

    return result
  }
}

module.exports = articleCategory
