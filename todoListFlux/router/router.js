import BoardContainer from '../src/components/BoardContainer'
import NewCard from '../src/components/addEditCard/NewCard'
import EditCard from '../src/components/addEditCard/EditCard'

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