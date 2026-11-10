import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router";
// import useLoading from "../Hooks/Useloading";
import useLoading from "../hooks/useLoading";










// const dummyRecipes = [
//   {
//     id: 1,
//     name: "Margherita Pizza",
//     image: "/images/recipe-1.svg",
//     cuisine: "Italian",
//     difficulty: "Easy",
//     rating: 4.8,
//     prepTimeMinutes: 20,
//     cookTimeMinutes: 15,
//   },
//   {
//     id: 2,
//     name: "Vegetable Stir-Fry",
//     image: "/images/recipe-2.svg",
//     cuisine: "Asian",
//     difficulty: "Easy",
//     rating: 4.6,
//     prepTimeMinutes: 15,
//     cookTimeMinutes: 10,
//   },
//   {
//     id: 3,
//     name: "Chocolate Chip Cookies",
//     image: "/images/recipe-3.svg",
//     cuisine: "American",
//     difficulty: "Medium",
//     rating: 4.9,
//     prepTimeMinutes: 15,
//     cookTimeMinutes: 12,
//   },
//   {
//     id: 4,
//     name: "Chicken Alfredo Pasta",
//     image: "/images/recipe-4.svg",
//     cuisine: "Italian",
//     difficulty: "Medium",
//     rating: 4.7,
//     prepTimeMinutes: 15,
//     cookTimeMinutes: 20,
//   },
//   {
//     id: 5,
//     name: "Mango Lassi",
//     image: "/images/recipe-5.svg",
//     cuisine: "Indian",
//     difficulty: "Easy",
//     rating: 4.9,
//     prepTimeMinutes: 10,
//     cookTimeMinutes: 0,
//   },
//   {
//     id: 6,
//     name: "Caprese Salad",
//     image: "/images/recipe-6.svg",
//     cuisine: "Italian",
//     difficulty: "Easy",
//     rating: 4.5,
//     prepTimeMinutes: 10,
//     cookTimeMinutes: 0,
//   },
// ];

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [errormsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
   const { loading, startLoading, stopLoading } = useLoading()
  async function fetchReciepe(skipCount, query) {
    startLoading();
    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;
      if (query) {
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`;
      }
      const { data } = await axios.get(url);
      setRecipes((prev) =>
        skipCount === 0 ? data.recipes : [...prev, ...data.recipes],
      );
      setTotal(data.total);
    } catch (error) {
      setErrorMsg(" please try again ...");
    }
    stopLoading();
  }

  useEffect(() => {
    fetchReciepe(0);
  }, []);
  function handelSearch(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    let query = form.get("query").trim();
    setSearchQuery(query);
    //  if(query){
    fetchReciepe(0, query);
    //  }
  }

  if (errormsg) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="text-accent hover:underline inline-flex items-center gap-1 mb-4"
        ></Link>
        <p className="text-accent  text-center">{errormsg}</p>
      </main>
    );
  }
  // if (loading) {
  //   return <p className="text-center py-6 text-muted">Loading...</p>;
  // }
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <form
        onSubmit={handelSearch}
        className="flex gap-2 max-w-md mx-auto mb-8"
      >
        <input
          type="text"
          name="query"
          placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium"
        >
          Search
        </button>
      </form>
      {loading && <p className="text-center py-6 text-muted">Loading...</p>}
      {!loading && recipes.length === 0 && (
        <p className="text-center py-6 text-muted">{`No recipes found for '${searchQuery}'`}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* {
  recipes.map((r)  => <li>{r.name}</li>)
} */}
      {recipes.length < total && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => fetchReciepe(recipes.length, searchQuery)}
            className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}

export default Home;



