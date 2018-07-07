let koa    = new (require('koa'))()
let router = new (require('koa-router'))()
let fs     = require('fs')

router.get('/',function(ctx) {
  ctx.type = 'html'
  ctx.body = fs.readFileSync('./index.html')
})

router.get('/static/:file', function(ctx) {
  let url  = ctx.originalUrl
  ctx.type = 'html'
  try {
    ctx.body = fs.readFileSync('.'+url);
  } catch(e) {
    ctx.body = `;console.error('file( "${url}" ) not found');`
  }
})

koa.use(router.routes())
   .use(router.allowedMethods())

koa.listen(3900)
