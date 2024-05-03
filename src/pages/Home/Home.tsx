import { useIconsContext } from "../../contexts/Icon"

import { Link } from "react-router-dom"
import Hero from "./components/Hero/Hero"
import AttributeComponent from "./components/AttributeComponent/AttributeComponent"

import "./Home.css"

const Home = () => {

  const { 
    BsPersonArmsUp,
    IoTimerOutline,
    FaSmileBeam,
   } = useIconsContext()

  return <>
    <main className="home__main">
      <Hero />
      <section 
        className="home__section home__attributes"
      >
        <h1 className="home__heading">
          Our strenghts!
        </h1>
        <div className="attributes-container">
          <AttributeComponent
            title="Dedication"
            Icon={BsPersonArmsUp}
          >
            We have army of dedicated couriers to deliver you any products you want - from letters to big boxes!
          </AttributeComponent>
          <AttributeComponent
            title="Efficiency"
            Icon={IoTimerOutline}
          >
            Our couriers are trained and taught to deliver the packages as fast as it's possible! No time waste!
          </AttributeComponent>
          <AttributeComponent
            title="Sympathy"
            Icon={FaSmileBeam}
          >
            We hire only the nicest couriers out of all candidates. Customer service is very important to us!
          </AttributeComponent>
        </div>
        <Link
          to="/about"
          className="btn btn--primary btn--for-attributes"
        >
          More about us
        </Link>
      </section>
    </main>
  </>
  
}

export default Home

