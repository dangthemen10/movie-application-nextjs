'use client';

import Footer from '@/components/Layout/Footer';
import GlobalLoading from '@/components/Common/GlobalLoading';
import Navbar from '@/components/Layout/Navbar';
import PeoplePopular from '@/components/PeoplePopular';
import ToastContainerBar from '@/components/Common/ToastContainer';
import peopleRequests from '@/utils/personRequest';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

const PersonPage: React.FC = () => {
  const [people, setPeople] = useState<IPopularTyping[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPersonData = async () => {
    try {
      setLoading(true);

      const [popular] = await Promise.all([
        fetch(peopleRequests.fetchPopular).then((res) => res.json())
      ]);

      setPeople(popular.results);

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error: any) {
      console.log('🚀 ~ file: page.tsx:20 ~ fetchPersonData ~ error:', error);
    }
  };

  useEffect(() => {
    fetchPersonData();
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
      <GlobalLoading isLoading={loading} />
      {!loading && (
        <main className="pl-4 pb-24 lg:space-y-24">
          <PeoplePopular people={people} />
        </main>
      )}
      <Footer />
    </motion.div>
  );
};

export default PersonPage;
