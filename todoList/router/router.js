import BoardContainer from '../src/BoardContainer'
import NewCard from '../src/addEditCard/NewCard'
import EditCard from '../src/addEditCard/EditCard'

const routes = [
  {
    path: "/",
    component: BoardContainer,
    routes: [
      {
        path: "/new",
        component: NewCard
      },
      {
        path: "/edit/:id",
        component: EditCard
      }
    ]
  }
]

export default routes