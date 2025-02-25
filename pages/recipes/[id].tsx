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
      <div className="content-wrapper">
        <div className="recipe-detail">
          <div className="ingredients">
            <div className="ingredients-inner">
              <h2>Ingredients</h2>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.name}: {ingredient.amount}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="instructions">
            <h2>Instructions</h2>
            <ol>
              {recipe.instructions.map((inst, index) => (
                <li key={index}>{inst.step}</li>
              ))}
            </ol>
            <Link
              href={`/recipes/${recipe.meta.id}/full`}
              className="view-full"
            >
              View Full Recipe
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 960px;
          margin: 2rem auto;
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
        .back-link,
        .view-full {
          display: inline-block;
          margin-bottom: 1rem;
          color: #0070f3;
          text-decoration: none;
          font-weight: bold;
        }
        .back-link:hover,
        .view-full:hover {
          text-decoration: underline;
        }
        .content-wrapper {
          height: calc(100vh - 4rem);
          overflow: hidden;
        }
        .recipe-detail {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
          height: 100%;
        }
        .ingredients {
          flex: 1;
          max-width: 300px;
          overflow-y: auto;
          height: 100%;
        }
        .ingredients-inner {
          border: 1px solid #e9ecef;
          padding: 1rem;
          border-radius: 6px;
          background: #f8f9fa;
        }
        .instructions {
          flex: 2;
          overflow-y: auto;
          height: 100%;
          border: 1px solid #e9ecef;
          padding: 1rem;
          border-radius: 6px;
          background: #f8f9fa;
        }
        @media (max-width: 768px) {
          .recipe-detail {
            flex-direction: column;
            height: auto;
          }
          .ingredients {
            max-height: 40vh;
          }
          .content-wrapper {
            height: auto;
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
