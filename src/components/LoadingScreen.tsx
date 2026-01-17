import Navbar from "./Navbar";

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to our App
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          This is a public landing page. You can see this without logging in.
        </p>
      </div>
    </>
  );
};

export default Landing;
