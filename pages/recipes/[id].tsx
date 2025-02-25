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
      <div className="recipe-image">
        <img src={recipe.meta.externalImage} alt={recipe.meta.title} />
      </div>
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
        .recipe-image {
          margin-bottom: 1rem;
          text-align: center;
        }
        .recipe-image img {
          max-width: 400px;
          height: auto;
          display: block;
          margin: 0 auto;
        }
        .content-wrapper {
          height: calc(100% - 6rem);
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
          border: 1px solid #ccc;
          padding: 1rem;
          border-radius: 6px;
          background: #f8f9fa;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        }
        .instructions {
          flex: 2;
          overflow-y: auto;
          height: 100%;
          border: 1px solid #ccc;
          padding: 1rem;
          border-radius: 6px;
          background: #f8f9fa;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        }
        @media (max-width: 768px) {
          .container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: 0;
            padding: 0.5rem;
            height: 100vh;
            overflow: hidden;
            overscroll-behavior: none;
          }
          .back-link {
            display: block;
            height: 2rem;
            line-height: 2rem;
            margin-bottom: 2rem !important;
          }
          .recipe-image {
            display: none;
          }
          .content-wrapper {
            height: calc(100% - 5rem);
            overflow: hidden;
          }
          .recipe-detail {
            display: flex;
            flex-direction: column;
            height: 100%;
            margin-top: 0;
          }
          .ingredients {
            flex: 1;
            min-height: 0;
            max-width: none;
            width: 100%;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
            margin-top: 1rem;
          }
          .instructions {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
            padding: 0.5rem 0.5rem 2rem 0.5rem;
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
