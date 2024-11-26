import Hero from '../../ui/Hero'
import FeaturedProducts from '../../ui/FeaturedProducts'
import Categories from '../../ui/Categories'
import Testimonials from '../../ui/Testimonials'
import Newsletter from '../../ui/Newsletter'
import Footer from '../../ui/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { host } from "../../host.js";

export default function Home() {
  const [categories, setCategories] = useState([1]);

  useEffect(() => {
    const getCategories = async () => {

      try {
        const response = await axios.get(`${host}/categories`);

        setCategories(response.data);
        
      } catch (error) {
        console.error(error.data);
      }
    };
    getCategories();
  },[]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <Categories categories={categories} />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

