const config = require('./config')

// const Trejo = require('@4lch4/trejo')
// const trejo = new Trejo({
//   apiKey: config.apiKey,
//   apiToken: config.apiToken
// })

const Trejo = require('@4lch4/trejo')
const trejo = new Trejo({
  apiKey: config.apiKey,
  apiToken: config.apiToken
})

const getListByName = (name, lists) => {
  for (const list of lists) {
    if (list.name === name) return list
  }

  return undefined
}

const main = async () => {
  try {
    const board = await trejo.members.getBoardByName('J. B. Hunt')
    const lists = await trejo.boards.getBoardLists(board.id)
    const list = getListByName('Doing', lists)

    const newCard = await trejo.cards.createCard({
      idList: list.id,
      name: 'Daily Tasks',
      desc: 'Things I should do every day.',
      pos: 'top'
    })

    const newCheckList = await trejo.checklists.createChecklist({
      idCard: newCard.id,
      name: 'Daily Tasks',
      pos: 'top'
    })

    const checkItemA = await trejo.checklists.createChecklistCheckItem(newCheckList.id, {
      name: 'Check Teams',
      pos: '1'
    })

    const checkItemB = await trejo.checklists.createChecklistCheckItem(newCheckList.id, {
      name: 'Check Email',
      pos: '2'
    })

    const checkItemC = await trejo.checklists.createChecklistCheckItem(newCheckList.id, {
      name: 'Just a test',
      pos: '3'
    })

    // const board = await trejo.members.getBoardByName('J. B. Hunt')
    // const lists = await trejo.boards.getBoardLists(board.id)
    // const list = getListByName(lists.data, 'Doing')
    // console.log(`list...`)
    // console.log(list)
    // const newCard = await trejo.cards.createCard({
    //   idList: list.id,
    //   name: 'Daily Tasks',
    //   desc: 'Things I should do every day.',
    //   pos: 'top'
    // })

    // console.log(`newCard...`)
    // console.log(newCard.data)
  } catch (err) { console.error(err) }
}

main().then(res => {
  console.log('Complete!')
  console.log(res)
}).catch(console.error)
// const qString = require('querystring')
// console.log(qString.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }))