const config = require('./config')

const path = require('path')
const fs = require('fs-extra')

const Trejo = require('../../Test-Projects/trello-lib-node')
const trejo = new Trejo(config.apiKey, config.apiToken)

const getListByName = (lists, name) => {
  for (const list of lists) {
    if (list.name === name) return list
  }

  return undefined
}

const main = async () => {
  try {
    const board = await trejo.MembersEndpoint.getBoardByName('J. B. Hunt')
    const lists = await trejo.BoardsEndpoint.getBoardLists(board.id)
    const list = getListByName(lists.data, 'Doing')
    const newCard = await trejo.CardsEndpoint.createCard({
      idList: list.id,
      name: 'Daily Tasks',
      desc: 'Things I should do every day.',
      pos: 'top'
    })

    console.log(`newCard... ${newCard.data.id}`)
  } catch (err) { console.error(err) }
}

main().then(res => {
  console.log('Complete!')
  console.log(res)
}).catch(console.error)
