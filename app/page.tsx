import Image from "next/image";
import Login from "./login/page";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Login />
    </div>
  );
}
