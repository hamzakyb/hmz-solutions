import { newServiceBlogPosts } from './blog-posts'

// Blog API Client for adding new service blog posts
class BlogAPIClient {
  private baseURL: string
  private adminToken: string | null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.adminToken = null
  }

  // Authenticate as admin
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        this.adminToken = data.token
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  // Add a blog post
  async addBlogPost(post: any): Promise<boolean> {
    if (!this.adminToken) {
      console.error('Not authenticated')
      return false
    }

    try {
      const response = await fetch(`${this.baseURL}/api/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.adminToken}`,
        },
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          featuredImage: post.featuredImage,
          slug: post.slug,
          tags: post.tags,
          published: true,
          seoTitle: post.title,
          seoDescription: post.excerpt,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`Successfully added: ${post.title} (ID: ${data.postId})`)
        return true
      } else {
        const errorData = await response.json()
        console.error(`Failed to add: ${post.title}`, errorData.error)
        return false
      }
    } catch (error) {
      console.error(`Error adding ${post.title}:`, error)
      return false
    }
  }

  // Add all new service blog posts
  async addAllNewServicePosts(): Promise<void> {
    console.log('Adding new service blog posts...')
    
    let successCount = 0
    let failCount = 0

    for (const post of newServiceBlogPosts) {
      console.log(`\nAdding: ${post.title}`)
      const success = await this.addBlogPost(post)
      
      if (success) {
        successCount++
      } else {
        failCount++
      }
    }

    console.log(`\nBlog post addition completed!`)
    console.log(`Successful: ${successCount}`)
    console.log(`Failed: ${failCount}`)
  }
}

export { BlogAPIClient }