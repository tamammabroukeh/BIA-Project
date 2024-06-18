import Title from "@/utils/Title";
import Form from "@/components/Form/Form";
export default function Home() {
  return (
    <main className="flex container mx-auto min-h-screen flex-col items-center justify-between relative">
      <div className="w-full h-screen">
        <Title
          classes="text-4xl custom-bg mx-0 laeding-slug px-0 flex justify-center mt-10
          py-5 rounded-lg w-full items-center text-slate-200"
          name="Welcome to the transportation services improvement system"
        />
        <div className="flex flex-wrap lg:flex-nowrap mt-10 justify-around">
          <Form />
        </div>
      </div>
    </main>
  );
}
