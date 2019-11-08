const { apiKey, apiToken } = require('./config')

// const Trejo = require('@4lch4/trejo')
// const trejo = new Trejo({
//   apiKey: config.apiKey,
//   apiToken: config.apiToken
// })

const Trejo = require('@4lch4/trejo')
const trejo = new Trejo({
  apiKey: apiKey,
  apiToken: apiToken
})

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
    idCard: newCard.id,
    name: 'Daily Tasks',
    pos: 'top'
  })

  const checkItemA = await trejo.checklists().createChecklistCheckItem(newCheckList.id, {
    name: 'Check Teams',
    pos: '1'
  })

  const checkItemB = await trejo.checklists().createChecklistCheckItem(newCheckList.id, {
    name: 'Check Email',
    pos: '2'
  })

  const checkItemC = await trejo.checklists().createChecklistCheckItem(newCheckList.id, {
    name: 'Just a test',
    pos: '3'
  })

}

const main = async () => {
  try {
    const board = await trejo.members().getBoardByName('J. B. Hunt')

    console.log('board...')
    console.log(board)

    const lists = await trejo.boards().getBoardLists(board.id)
    const list = getListByName('Doing', lists)

    // trejo


    const newCard = await createCard(list.id)
    const newCheckList = await createChecklistAndItems(newCard.id)
  } catch (err) { console.error(err) }
}

main().then(res => {
  console.log('Complete!')
  console.log(res)
}).catch(console.error)
// const qString = require('querystring')
// console.log(qString.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }))