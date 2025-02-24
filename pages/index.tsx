import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllRecipes } from "../lib/recipes";
import { RecipeData } from "../types/recipe";

interface HomeProps {
  recipes: RecipeData[];
}

export default function Home({ recipes }: HomeProps) {
  return (
    <div>
      <h1>Simple Recipes</h1>
      <div className="grid">
        {recipes.map((recipe) => (
          <Link
            legacyBehavior
            key={recipe.meta.id}
            href={`/recipes/${recipe.meta.id}`}
          >
            <a className="card">
              <h2>{recipe.meta.title}</h2>
              <Image
                src={recipe.meta.image}
                alt={recipe.meta.title}
                width={300}
                height={200}
              />
            </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        .card {
          border: 1px solid #ccc;
          padding: 1rem;
          text-align: center;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.2s ease;
        }
        .card:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        h2 {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const recipes = getAllRecipes();
  return { props: { recipes } };
};
