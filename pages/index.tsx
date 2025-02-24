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
              <div className="image-wrapper">
                <Image
                  src={recipe.meta.image}
                  alt={recipe.meta.title}
                  width={300}
                  height={200}
                />
              </div>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>{`
        div {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background: #f8f9fa;
          padding: 2rem;
        }
        h1 {
          text-align: center;
          margin: 0;
          color: #333;
          font-size: 2.5rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
          padding: 2rem 0;
        }
        .card {
          background: #f8f9fa;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
          color: inherit;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
        }
        h2 {
          margin: 1rem;
          text-align: center;
          font-size: 1.5rem;
        }
        .image-wrapper {
          padding: 8px;
        }
      `}</style>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const recipes = getAllRecipes();
  return { props: { recipes } };
};
