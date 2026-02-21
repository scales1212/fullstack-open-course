const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce(((sum, blog) => sum + blog.likes), 0)
  return likes
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((highest, blog) => {
    if (blog.likes > highest.likes) {
      return blog
    }
    else {
      return highest
    }
  })
  
  return favorite
}

/**
 * reduce returns obj, so needed to call Object.entries to return arr for map
 * @param {*} blogs 
 * @returns 
 */
const mostBlogs = (blogs) => {
  const most = Object.entries(blogs.reduce(((list, blog) => {
    list[blog.author] = list[blog.author] + 1 || 1
    return list
  }), {}))
  .map(entry => {
    console.log(entry[0])
    console.log(entry[1])
    return {
      "author": entry[0],
      "blogs": entry[1]
    }
  })
  .reduce((max, curr) => {
    return curr.blogs > max.blogs ? curr : max
  })
  
 return most
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}