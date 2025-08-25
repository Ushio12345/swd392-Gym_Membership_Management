import Center from "../center/Center";
import Banner from "./patials/Banner";
import Packages from "./patials/Packages";

const Home = () => {
  return (
    <>
      <section>
        <Banner />
      </section>
      <section className="section bg-secondary ">
        <Packages />
      </section>
      <section>
        <Center />
      </section>
    </>
  );
};

export default Home;
