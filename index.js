const { apiKey, apiToken } = require('./config')
const Logger = require('simple-node-logger')
const logManager = new Logger()
logManager.createConsoleAppender()
logManager.createRollingFileAppender({
  logDirectory: './logs',
  fileNamePattern: 'roll-<DATE>.log',
  dateFormat: 'YYYY.MM.DD'
})
const logger = logManager.createLogger()

// const Trejo = require('@4lch4/trejo')
// const trejo = new Trejo({
//   apiKey: config.apiKey,
//   apiToken: config.apiToken
// })

const Trejo = require('../Trejo-ts')
const trejo = new Trejo({
  apiKey: apiKey,
  apiToken: apiToken
})

const CheckItems = [
  { name: 'Check Teams', pos: '1' },
  { name: 'Check E-Mail', pos: '2' },
  { name: 'I \'unno...', pos: '3' }
]

const getListByName = (name, lists) => {
  for (const list of lists) {
    if (list.name === name) return list
  }

  return undefined
}

const createCard = async listId => {
  return trejo.cards().createCard({
    idList: listId,
    name: 'Daily Tasks',
    desc: 'Things I should do every day.',
    pos: 'top'
  })
}

const createChecklistAndItems = async cardId => {
  const newCheckList = await trejo.checklists().createChecklist({
    idCard: cardId,
    name: 'Daily Tasks',
    pos: 'top'
  })

  for (const checkItem of CheckItems) {
    await trejo.checklists().createChecklistCheckItem(newCheckList.id, checkItem)
  }

  return newCheckList
}

const main = async () => {
  try {
    const board = await trejo.members().getBoardByName('J. B. Hunt')

    const lists = await trejo.boards().getBoardLists(board.id)
    const list = getListByName('Doing', lists)

    // const newCard = await createCard(list.id)
    // const newCheckList = await createChecklistAndItems(newCard.id)
  } catch (err) { logger.error(err) }
}

main().then(res => {
  logger.info('Complete!')
  if (res) logger.info(res)
}).catch(err => logger.error(err))
// const qString = require('querystring')
// console.log(qString.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }))
