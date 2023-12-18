import Head from "next/head";
import RootLayout from "@/components/Layouts/RootLayout";
// import Banner from "@/components/UI/Banner";
import AllNews from "@/components/UI/AllNews";
import { useGetNewsesQuery } from "@/redux/api/api";
import dynamic from 'next/dynamic'


const HomePage = ({ allNews }) => {

  const { data, isLoading, isError, error } = useGetNewsesQuery();
  console.log(data);

  const BannerHeader = dynamic(() => import('@/components/UI/Banner'), {
    ssr: false,
    loading: () => <h1>Loading...</h1>,
  })

  return (
    <>
      <Head>
        <title>PH-News Portal</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BannerHeader />
      {/* <AllNews allNews={allNews} /> */}
      <AllNews allNews={data} />
    </>
  );
};
export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:5000/news");
  const data = await res.json();
  return {
    props: {
      allNews: data
    },
  }
}
