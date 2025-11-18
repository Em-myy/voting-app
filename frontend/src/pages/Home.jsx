import image1 from "../assets/secondImage-Photoroom.png";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="w-full bg-yellow-300 dark:bg-yellow-500 min-h-dvh m-0">
      <div className="bg-[#CCE7F4] dark:bg-[#366075] min-h-screen w-full rounded-tl-[200px] md:rounded-tl-[400px] rounded-br-[200px] md:rounded-br-[400px]">
        <div className="flex pt-4 justify-center md:justify-end">
          <Navbar />
        </div>
        <div className="flex flex-col md:flex-row justify-evenly">
          <div>
            <img
              className="w-[700px] md:w-[1000px] h-[600px] md:h-[900px]"
              src={image1}
            />
          </div>
          <div className="flex flex-col justify-center mb-[100px]">
            <div className="text-[100px] dark:text-[#CEE8F5] text-center md:text-start animate-bounce">
              Online Voting
            </div>
            <div className="text-[40px] dark:text-[#CEE8F5] text-center md:text-start">
              Welcome
            </div>
            <div className="text-[35px] dark:text-[#CEE8F5] text-center md:text-start">
              Please vote for a candidate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
