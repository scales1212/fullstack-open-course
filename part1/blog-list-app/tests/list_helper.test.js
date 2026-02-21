const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listOneBlog = [
  {
    "title": "Worst Blog",
    "author": "Mary Shelley",
    "url": "https://worstblog.com",
    "likes": 1000,
    "id": "699a19fb72bb79dea547201d"
  }
]

const favorite = 
  {
    "title": "Worst Blog",
    "author": "Mary Shelley",
    "url": "https://worstblog.com",
    "likes": 1000,
    "id": "699a19fb72bb79dea547201d"
  }

const listTwoBlogs = [
  {
    "title": "Best Blog",
    "author": "JR Tolkin",
    "url": "https://www.bestblog.com",
    "likes": 10,
    "id": "699100c42c368fecd743a9df"
  },
  {
    "title": "Worst Blog",
    "author": "Mary Shelley",
    "url": "https://worstblog.com",
    "likes": 1000,
    "id": "699a19fb72bb79dea547201d"
  }
]

const listThreeBlogs = [
  {
    "title": "Best Blog",
    "author": "JR Tolkin",
    "url": "https://www.bestblog.com",
    "likes": 10,
    "id": "699100c42c368fecd743a9df"
  },
  {
    "title": "Worst Blog",
    "author": "Mary Shelley",
    "url": "https://worstblog.com",
    "likes": 1000,
    "id": "699a19fb72bb79dea547201d"
  },
  {
    "title": "Ok Blog",
    "author": "Mary Shelley",
    "url": "https://okblog.com",
    "likes": 50,
    "id": "699a19fb72bb79dea5472111"
  }
]

describe('dummy test', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('totalLikes testing', () => {
  

  test('test totalLike on list of 1', () => {
    const result = listHelper.totalLikes(listOneBlog)

    assert.strictEqual(result, 1000)
  })

  test('test totalLike on list of 2', () => {
    const result = listHelper.totalLikes(listTwoBlogs)

    assert.strictEqual(result, 1010)
  })

describe('favoriteBlog testing', () => {
  test('test favoriteBlog on list of 2', () => {
    const result = listHelper.favoriteBlog(listTwoBlogs)

    assert.deepStrictEqual(result, favorite)
  })
})

describe('mostBlogs testing', () => {
  test('test mostBlogs on list 3', () => {
    const result = listHelper.mostBlogs(listThreeBlogs)

    const answer = 
    {
      "author": "Mary Shelley",
      "blogs": 2
    }

    assert.deepStrictEqual(result, answer)
  })
})
})
