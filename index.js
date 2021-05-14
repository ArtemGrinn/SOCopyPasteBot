const fastify = require('fastify')
const { Telegraf } = require('telegraf')
const telegrafPlugin = require('fastify-telegraf')

const PORT = process.env.PORT || 3000

const bot = new Telegraf("1865995819:AAEkdO2JZAoWCUNAxdRLM08O6JC2Fw1ACH0")
const app = fastify()
const SECRET_PATH = '/my-secret-path'
const WEBHOOK_URL = `https://socopypastebot.herokuapp.com${SECRET_PATH}`

const menu = () => {
    return Telegraf
      .markup((m) =>
        m.inlineKeyboard([
          [
            m.callbackButton('Press 0', '0'),
            m.callbackButton('Press 1', '1')
          ]
        ])
      )
  };

app.register(telegrafPlugin, { bot, path: SECRET_PATH })

bot.on('message', (ctx) => ctx.reply('Hello', menu()))
    .on('callback_query', (ctx) => {
        ctx.answerCbQuery();
        ctx.deleteMessage();
        ctx.reply(`You press ${ctx.callbackQuery.data}`, menu())
    });

bot.telegram.setWebhook(WEBHOOK_URL).then(() => {
  console.log('Webhook is set on', WEBHOOK_URL)
})

app.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

app.listen(PORT, "0.0.0.0").then(() => {
  console.log('Listening on port', PORT)
})