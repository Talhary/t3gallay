import Link from "next/link";
import Image from "next/image";
const mockImageUrlIds = [
  "9083c6ee-e4c9-4c74-aaa3-a39d1c9173ef-jql0t1.jpg",
  "f746e37d-d0f5-44e3-8236-4ba617a15fd4-f2iq3p.jpg",
  "410a5bdc-7c57-4242-bb63-dcba6262a56b-1d4zp5.jpg",
  "2298fbec-6a0e-4ece-b69f-79066f8c60d2-vi2rk6.jpg",
  "547372fb-ae88-4cbc-a446-6dd474d2176e-vi2rk6.png",
];
type DataType = {
  id: number;
  url: string;
};
const mockImageUrls = mockImageUrlIds.map((id, index) => {
  return {
    id: index + 1,
    url: "https://utfs.io/f/" + id,
  };
});
export default function HomePage() {
  return (
    <main className="mx-auto flex flex-row flex-wrap gap-4 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white max-md:justify-center">
      {mockImageUrls.map((img: DataType) => {
        return (
          <div className="" key={img.id}>
            <img src={img.url} alt="img.text" width={300} height={200} />
          </div>
        );
      })}
    </main>
  );
}
