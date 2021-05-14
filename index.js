const fastify = require('fastify')
const { Telegraf } = require('telegraf')
const telegrafPlugin = require('fastify-telegraf')

const PORT = process.env.PORT || 3000
const WEBHOOK_URL = `https://socopypastebot.herokuapp.com`

const bot = new Telegraf("1865995819:AAEkdO2JZAoWCUNAxdRLM08O6JC2Fw1ACH0")
const app = fastify()

const SECRET_PATH = `/telegraf/1865995819`
app.register(telegrafPlugin, { bot, path: SECRET_PATH })

bot.on('text', (ctx) => ctx.reply('Hello'))

bot.telegram.setWebhook(WEBHOOK_URL).then(() => {
  console.log('Webhook is set on', WEBHOOK_URL)
})

app.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

app.listen(PORT, "0.0.0.0").then(() => {
  console.log('Listening on port', PORT)
})