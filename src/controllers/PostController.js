class PostController {
  // Simula la obtención de la colección de publicaciones como si fuera una API
  static async getCollection() {
    try {
      // Simulamos una petición HTTP, pero cargamos el archivo JSON localmente
      const response = await fetch("/JSONs/postsCollection.json"); // URL relativa al archivo
      if (!response.ok) {
        throw new Error("Error al obtener la colección de publicaciones");
      }
      const data = await response.json(); // Convierte la respuesta a JSON
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Simula la obtención de una publicación por su ID
  static async get(slug) {
    try {
      const response = await fetch(`/JSONs/${slug}.json`); // URL relativa al archivo
      if (!response.ok) {
        throw new Error(`No se encontró la publicación con ID: ${slug}`);
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default PostController;
