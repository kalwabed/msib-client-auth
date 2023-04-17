import { NavLink } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

function HomePage() {
  const { users, addNewUser, isLoading, removeUser, updateUser } = useFetch()

  const handleOnSubmit = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const job = formData.get('job')

    await addNewUser({ name, job })
  }

  return (
    <>
      <hgroup>
        <h1>Home</h1>
        <p>Add anything, you'll soon forget it.</p>
      </hgroup>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="job" placeholder="job" />

        <button aria-busy={isLoading} type="submit">
          Submit
        </button>
      </form>

      <ul>
        {users?.map(user => (
          <li key={user.id}>
            <input
              defaultValue={user.first_name}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  updateUser({ name: e.target.value, id: user.id })
                }
              }}
            />
            <button
              onClick={() => removeUser(user.id)}
              className="secondary"
              style={{ width: '150px', height: '70px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default HomePage
