const fastify = require('fastify')
const { Telegraf, Markup } = require('telegraf')
const telegrafPlugin = require('fastify-telegraf')

const PORT = process.env.PORT || 3000
const bot = new Telegraf(process.env.TOKEN)
const app = fastify()
const SECRET_PATH = '/my-secret-path'
const WEBHOOK_URL = `https://socopypastebot.herokuapp.com${SECRET_PATH}`

const inlineMessageRatingKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('👍', 'like'),
    Markup.button.callback('👎', 'dislike')
])

app.register(telegrafPlugin, { bot, path: SECRET_PATH })

bot.on('message', (ctx) => ctx.telegram.sendMessage(ctx.from.id, 'Like?', inlineMessageRatingKeyboard))
bot.action('like', (ctx) => ctx.editMessageText('🎉 Awesome! 🎉'))
bot.action('dislike', (ctx) => ctx.editMessageText('okey'))

bot.telegram.setWebhook(WEBHOOK_URL).then(() => {
  console.log('Webhook is set on', WEBHOOK_URL)
})

app.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

app.listen(PORT, "0.0.0.0").then(() => {
  console.log('Listening on port', PORT)
})