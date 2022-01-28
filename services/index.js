
export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id=='${userId}']`;
  return query
};
export const getLatestRecipes = () => {
  const query = `*[_type == "recipe" ] | order(_createdAt desc){
    slug,
    title,
    category,
    "imageUrl": image.asset->url,
    _id
        
 
    }[0...3]`;
  return query;
};



export const getAllRecipes = () => {
  const query = `*[_type == "recipe" ] | order(_createdAt desc){
        slug,
        title,
        category,
        "imageUrl": image.asset->url,
        _id
        
 
    }`;
  return query;
};

