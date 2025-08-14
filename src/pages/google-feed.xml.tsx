import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const backendRes = await fetch(
    "https://prod.srv788767.hstgr.cloud/api/v1/products/google-feed.xml"
  );
  const xml = await backendRes.text();

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function GoogleFeed() {
  return null;
}
