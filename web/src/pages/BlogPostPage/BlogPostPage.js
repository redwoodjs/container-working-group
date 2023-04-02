import { MetaTags } from '@redwoodjs/web'

import BlogPostCell from 'src/components/BlogPostCell'

const BlogPostPage = ({ id }) => {
  return (
    <>
      <MetaTags title={`Post ${id}`} description={`Description ${id}`} />

      <BlogPostCell id={id} />
    </>
  )
}

export default BlogPostPage
