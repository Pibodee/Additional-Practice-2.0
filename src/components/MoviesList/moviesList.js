export const MoviesList = ({ movies, onDelete, changeStatus, openModal }) => {
    return (<ul>{movies.map(({isWatched, title, poster, votes, id}) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
            <p>Votes: {votes}</p>
            <p>Watched: {`${isWatched}`}</p>
            <button type="button" onClick={() => onDelete(id)}>
              Delete
            </button>
            <button type="button" onClick={() => changeStatus(id)}>
              ChangeStatus
            </button>
            <button type="button" onClick={() => openModal(poster)}>
              Open Modal
            </button>
          </li>
        );
    })}</ul>)
}