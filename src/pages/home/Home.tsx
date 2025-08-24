import Banner from "./patials/Banner";
import Packages from "./patials/Packages";

const Home = () => {
  return (
    <>
      <section>
        <Banner />
      </section>
      <div className="section bg-secondary ">
        <Packages />
      </div>
    </>
  );
};

export default Home;
