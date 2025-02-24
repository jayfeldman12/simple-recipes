import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { getAllRecipeIds, getRecipeData } from "../../lib/recipes";
import { RecipeData } from "../../types/recipe";

interface RecipeProps {
  recipe: RecipeData;
}

export default function RecipeDetail({ recipe }: RecipeProps) {
  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back to Home
      </Link>
      <div className="recipe-detail">
        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name}: {ingredient.amount}
              </li>
            ))}
          </ul>
        </div>
        <div className="instructions">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((inst, index) => (
              <li key={index}>{inst.step}</li>
            ))}
          </ol>
          <Link href={`/recipes/${recipe.meta.id}/full`} className="view-full">
            View Full Recipe
          </Link>
        </div>
      </div>
      <style jsx>{`
        .recipe-detail {
          display: flex;
          gap: 2rem;
          margin-top: 1rem;
        }
        .ingredients {
          flex: 1;
          max-width: 300px;
          overflow-y: auto;
        }
        .instructions {
          flex: 2;
        }
        @media (max-width: 768px) {
          .recipe-detail {
            flex-direction: column;
          }
          .ingredients {
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 1;
          }
        }
      `}</style>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = getAllRecipeIds();
  const paths = ids.map((id) => ({ params: { id } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const recipe = getRecipeData(id);
  return { props: { recipe } };
};
