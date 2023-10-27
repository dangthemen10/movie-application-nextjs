'use client';

import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import ToastContainerBar from '@/components/Common/ToastContainer';
import Footer from '@/components/Layout/Footer';
import Navbar from '@/components/Layout/Navbar';
import PeoplePopular from '@/components/PeoplePopular';
import { API_KEY, BASE_MOVIE_URL } from '@/utils/baseUrl';

const PersonPage: React.FC = () => {
  const [people, setPeople] = useState<IPopularTyping[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPersonData = async () => {
    try {
      setLoading(true);

      const popular = await fetch(
        `${BASE_MOVIE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      ).then((res) => res.json());
      setPeople((prev) => {
        return [...prev, ...popular?.results];
      });
      setLoading(false);
    } catch (error: any) {
      console.log('🚀 ~ file: page.tsx:20 ~ fetchPersonData ~ error:', error);
    }
  };

  useEffect(() => {
    fetchPersonData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setPage((prev) => {
          return prev + 1;
        });
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="overflow-x-hidden"
    >
      <ToastContainerBar />
      <Navbar />

      <main className="pl-4 pb-24 lg:space-y-24">
        <PeoplePopular people={people} />
      </main>
      {loading && <LinearProgress />}
      <Footer />
    </motion.div>
  );
};

export default PersonPage;
