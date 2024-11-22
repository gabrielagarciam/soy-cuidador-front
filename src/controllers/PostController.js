/**
 * Controller class for handling post-related operations
 * @class PostController
 */
class PostController {

  static API_ENDPOINTS = {
    COLLECTION: '/api/getPostCollection',
    SINGLE_POST: '/api/getPost',
    UPDATE_LIKES: '/api/updatePostLikeCount'
  };

  /**
   * Default request headers for API calls
   * @private
   */
  static #defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  /**
   * Makes an API request with error handling
   * @private
   * @param {string} url - The API endpoint URL
   * @param {Object} options - Request options
   * @returns {Promise<any>} - Parsed response data
   * @throws {Error} - Custom error with status code and message
   */
  static async #makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.#defaultHeaders,
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON response from server');
      }
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  /**
   * Validates a slug parameter
   * @private
   * @param {string} slug - The slug to validate
   * @throws {Error} - If slug is invalid
   */
  static #validateSlug(slug) {
    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
      throw new Error('Invalid slug parameter');
    }
  }

  /**
   * Retrieves the collection of posts
   * @public
   * @returns {Promise<Array>} Array of post documents
   * @throws {Error} If fetching fails
   */
  static async getCollection() {
    try {
      const { documents } = await this.#makeRequest(this.API_ENDPOINTS.COLLECTION);

      if (!Array.isArray(documents)) {
        throw new Error('Invalid response format: documents is not an array');
      }

      return documents;
    } catch (error) {
      console.error('Failed to fetch post collection:', error);
      throw new Error('Unable to retrieve posts collection');
    }
  }

  /**
   * Retrieves a single post by slug
   * @public
   * @param {string} slug - The post slug
   * @returns {Promise<Object>} Post data
   * @throws {Error} If fetching fails or post not found
   */
  static async get(slug) {
    try {
      this.#validateSlug(slug);

      const url = new URL(this.API_ENDPOINTS.SINGLE_POST, window.location.origin);
      url.searchParams.append('slug', slug);

      const post = await this.#makeRequest(url.toString());

      if (!post || typeof post !== 'object') {
        throw new Error('Invalid post data received');
      }

      return post;
    } catch (error) {
      console.error(`Failed to fetch post with slug ${slug}:`, error);
      throw new Error(`Unable to retrieve post: ${error.message}`);
    }
  }

  /**
   * Updates the like count for a post
   * @public
   * @param {string} slug - The post slug
   * @returns {Promise<number>} Updated like count
   * @throws {Error} If update fails
   */
  static async likePost(slug) {
    try {
      this.#validateSlug(slug);

      const { likeCount } = await this.#makeRequest(this.API_ENDPOINTS.UPDATE_LIKES, {
        method: 'POST',
        body: JSON.stringify({
          slug,
          increment: 1
        })
      });

      if (typeof likeCount !== 'number' || likeCount < 0) {
        throw new Error('Invalid like count received');
      }

      return likeCount;
    } catch (error) {
      console.error(`Failed to update likes for post ${slug}:`, error);
      throw new Error('Unable to update post likes');
    }
  }
}

export default PostController;