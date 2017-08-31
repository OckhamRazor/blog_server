/**
 * 用户信息业务操作
 */
const validator = require('validator')
const articleModel = require('./../models/article')
const articleTempModel = require('./../models/article_temp')
const articleCode = require('./../codes/article')
const validateRules = require('../utils/regexp_rules')
const util = require('../utils/format')

/**
 * 格式化文章数据格式
 * @param {object} originalData 原始数据
 */
function formatArticleData (originalData) {
  var newData = {
    title: originalData.title || '',
    category: +originalData.category,
    tag: originalData.tag || [],
    author_id: originalData.author_id,
    overview: originalData.overview || '',
    plain_text: originalData.plainText || '',
    html: originalData.html || ''
  }
  if (newData.tag) {
    newData.tag = util.arrToStr(originalData.tag)
  }

  return newData
}

const article = {
  /**
   * 创建文章
   * @param {object} data    表单信息
   * @return {object} result 操作结果
   */
  async createArticle (data) {
    let result = {
      success: false,
      message: ''
    }
    let newData = formatArticleData(data)
    // 写入article_temp表
    let createResult = await articleTempModel.create(newData)
    if (!createResult) {
      result.message = articleCode.FAIL_ARTICLE_CREATE
      return result
    }

    result.success = true
    result.message = articleCode.SUCCESS_ARTICLE_CREATE
    result.data = {
      id: createResult.insertId
    }

    return result
  },

  /**
   * 根据文章ID获取已发布文章
   * @param {string} articleId 文章ID
   * @return {object} result 操作结果
   */
  async getArticle (articleId) {
    let result = {
      success: false,
      message: ''
    }
    let data = await articleModel.getArticleById(articleId)
    if (!data) {
      result.message = articleCode.FAIL_ARTICLE_READ
      return result
    }

    data = {
      id: data.id,
      title: data.title,
      category: data.category,
      tag: util.strToArr(data.tag),
      authorId: data.author_id,
      overview: data.overview,
      plainText: data.plain_text,
      html: data.html,
      createTime: data.create_time,
      modifyTime: data.modify_time
    }

    result.success = true
    result.message = articleCode.SUCCESS_ARTICLE_READ
    result.data = data

    return result
  },

  /**
   * 根据文章ID获取暂存文章
   * @param {string} articleId 文章ID
   * @return {object} result 操作结果
   */
  async getArticleTemp (articleId) {
    let result = {
      success: false,
      message: ''
    }
    let data = await articleTempModel.getArticleById(articleId)
    if (!data) {
      result.message = articleCode.FAIL_ARTICLE_READ
      return result
    }

    data = {
      id: data.id,
      title: data.title,
      category: data.category,
      tag: util.strToArr(data.tag),
      authorId: data.author_id,
      overview: data.overview,
      plainText: data.plain_text,
      html: data.html,
      createTime: data.create_time,
      modifyTime: data.modify_time
    }

    result.success = true
    result.message = articleCode.SUCCESS_ARTICLE_READ
    result.data = data

    return result
  },

  /**
   * 更新暂存文章
   * @param {string} articleId 文章ID
   * @param {object} data    表单信息
   * @return {object} result 操作结果
   */
  async updateArticle (articleId, data) {
    let result = {
      success: false,
      message: ''
    }
    // 查询是否存在该文章
    let searchResult = await articleTempModel.getExistOne(articleId)
    if (!searchResult) {
      result.message = articleCode.FAIL_ARTICLE_NO_EXIST
      return result
    }
    // 格式化数据
    let newData = formatArticleData(data)
    let updateResult = await articleTempModel.updateArticleById(articleId, newData)
    if (!updateResult) {
      result.message = articleCode.FAIL_ARTICLE_UPDATE
      return result
    }

    result.success = true
    result.message = articleCode.SUCCESS_ARTICLE_UPDATE

    return result
  },

  /**
   * 发布文章
   * @param {string} articleId 文章ID
   * @return {object} result 操作结果 
   */
  async publishArticle (articleId) {
    let result = {
      success: false,
      message: ''
    }
    // 查询是否存在该文章
    let articleData = await articleTempModel.getArticleById(articleId)
    let isExist = await articleModel.getExistOne(articleId)

    let publishResult
    if (isExist) {
      // 如果存在文章，则更新文章
      publishResult = await articleModel.updateArticleById(articleId, articleData)
    } else {
      // 如果不存在文章，则创建文章
      publishResult = await articleModel.create(articleData)
    }
    
    if (!publishResult) {
      result.message = articleCode.FAIL_ARTICLE_PUBLISH
      return result
    }

    result.success = true
    result.message = articleCode.SUCCESS_ARTICLE_PUBLISH

    return result
  },

  /**
   * 删除文章
   * @param {string} articleId 文章ID
   * @return {object} result 操作结果 
   */
  async deleteArticle (articleId) {
    let result = {
      success: false,
      message: ''
    }

    // 查询是否存在该文章
    let searchResult = await articleModel.getExistOne(articleId)
    if (!searchResult) {
      result.message = articleCode.FAIL_ARTICLE_NO_EXIST
      return
    } 
    // 标记失效
    let updateResult = await articleModel.updateArticleById(articleId, {status: 1})
    if (!updateResult) {
      result.message = articleCode.FAIL_ARTICLE_DELETE
      return result
    }

    result.success = true
    result.message = articleCode.SUCCESS_ARTICLE_DELETE

    return result
  },

  /**
   * 获取已发布文章列表
   * @return {object} result 文章列表
   */
  async getPublishedArticleList (params) {
    let result = {
      success: false,
      message: ''
    }

    let query = {
      category: params.category,
      keywords: params.keywords && params.keywords.split(' ') || []
    }

    data = await articleModel.getArticleList(query)
    if (!data) {
      result.message = articleCode.FAILED_ARTICLE_LIST_READ
      return result
    }

    data = data.map((item, value) => {
      return {
        id: item.id,
        title: item.title,
        category: item.category,
        tag: util.strToArr(data.tag),
        authorId: item.author_id,
        createTime: item.create_time
      }
    })

    result.success = true
    result.message = articleCode.SUCCESS_ARTICLE_LIST_READ
    result.data = data

    return result
  },

  /**
   * 获取暂存文章列表
   * @param {object} params 
   */
  async getTempArticleList (params) { 
    let result = {
      success: false,
      message: ''
    }

    let query = {
      category: params.category,
      keywords: params.keywords && params.keywords.split(' ') || []
    }

    data = await articleTempModel.getArticleList(query)
    if (!data) {
      result.message = articleCode.FAILED_ARTICLE_LIST_READ
      return result
    }

    data = data.map((item, value) => {
      return {
        id: item.id,
        title: item.title,
        category: item.category,
        tag: util.strToArr(data.tag),
        authorId: item.author_id,
        createTime: item.create_time
      }
    })

    result.success = true
    result.message = articleCode.SUCCESS_ARTICLE_LIST_READ
    result.data = data

    return result
  }
}

module.exports = article
