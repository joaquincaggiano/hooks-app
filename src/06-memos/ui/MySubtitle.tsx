import { memo } from "react";

interface Props {
  subtitle: string;
}
export const MySubtitle = memo(({ subtitle }: Props) => {
  console.log("MySubtitle re-render");

  return (
    <>
      <h6 className="text-2xl">{subtitle}</h6>

      <button className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer">
        Llamar a función
      </button>
    </>
  );
});
