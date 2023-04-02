const Author = ({ author }) => {
  return (
    <span>
      {author.fullName} ({author.email})
    </span>
  )
}

export default Author
