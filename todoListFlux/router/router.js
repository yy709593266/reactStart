import BoardContainer from '../src/component/BoardContainer'
import NewCard from '../src/component/addEditCard/NewCard'
import EditCard from '../src/component/addEditCard/EditCard'

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