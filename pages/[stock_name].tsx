import { GetServerSideProps } from "next";

interface IDetailProps {
  stock_name: string;
}

const Detail = ({ stock_name }: IDetailProps) => {

  return <div>{stock_name}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const stock_name = query.stock_name ?? "";
  return { props: { stock_name } };
};

export default Detail;
