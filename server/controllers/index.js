module.exports = {
  async indexPage ( ctx ) {
    await ctx.render('index.html')
  }
}
