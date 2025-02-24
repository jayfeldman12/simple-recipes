import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { getAllRecipeIds, getRecipeData } from "../../../lib/recipes";
import { RecipeData } from "../../../types/recipe";

interface FullRecipeProps {
  recipe: RecipeData;
}

export default function FullRecipe({ recipe }: FullRecipeProps) {
  return (
    <div className="container">
      <h1>{recipe.meta.title}</h1>
      <Link href={`/recipes/${recipe.meta.id}`} className="back-link">
        ← Back to Recipe
      </Link>
      <div className="full-content">
        <pre>{recipe.fullText}</pre>
      </div>
      <style jsx>{`
        .full-content {
          margin-top: 1rem;
          white-space: pre-wrap;
          font-family: monospace;
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
