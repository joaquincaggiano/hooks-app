interface Props {
  title: string;
}

export const MyTitle = ({ title }: Props) => {
  console.log("MyTitle re-render");

  return <h1 className="text-3xl font-bold ">{title}</h1>;
};
