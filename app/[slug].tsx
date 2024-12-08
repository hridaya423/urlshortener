import { GetServerSideProps } from "next";
import { supabase } from "../lib/supabase";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params!;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await supabase
    .from("urls")
    .select("original_url")
    .eq("slug", slug)
    .single();

  if (data?.original_url) {
    return {
      redirect: {
        destination: data.original_url,
        permanent: false,
      },
    };
  }

  return { notFound: true };
};

export default function SlugPage() {
  return <p>Redirecting...</p>;
}
