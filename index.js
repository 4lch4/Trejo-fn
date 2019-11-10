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

const Scheduler = require('node-schedule')

const Trejo = require('@4lch4/trejo')
const trejo = new Trejo({
  apiKey: apiKey,
  apiToken: apiToken
})

const Checklists = trejo.checklists()
const Members = trejo.members()
const Boards = trejo.boards()
const Cards = trejo.cards()

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
  return Cards.createCard({
    idList: listId,
    name: 'Daily Tasks',
    desc: 'Things I should do every day.',
    pos: 'top'
  })
}

const createChecklistAndItems = async cardId => {
  const newCheckList = await Checklists.createChecklist({
    idCard: cardId,
    name: 'Daily Tasks',
    pos: 'top'
  })

  for (const checkItem of CheckItems) {
    await Checklists.createChecklistCheckItem(newCheckList.id, checkItem)
  }

  return newCheckList
}

const MajorLabel = boardId => {
  return { color: 'orange', name: 'Major', idBoard: boardId }
}

const main = async () => {
  try {
    const board = await Members.getBoardByName('J. B. Hunt')

    const lists = await Boards.getBoardLists(board.id)
    const list = getListByName('Doing', lists)

    const newCard = await createCard(list.id)
    const majorLabel = await Cards.addNewCardLabel(newCard.id, MajorLabel(board.id))
    const newCheckList = await createChecklistAndItems(newCard.id)
  } catch (err) { logger.error(err) }
}

Scheduler.scheduleJob('Trejo nightly tasks.', '0 0 17 * * 3,4,5,6', fireTime => {
  console.log(`fireTime = ${fireTime}`)
  main().then(res => {
    logger.info(`fireTime = ${fireTime}`)
    logger.info('Complete!')
    if (res) logger.info(res)
  }).catch(err => logger.error(err))
})
