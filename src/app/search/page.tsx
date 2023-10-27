'use client';

import { motion } from 'framer-motion';
import ToastContainerBar from '@/components/Common/ToastContainer';
import Footer from '@/components/Layout/Footer';
import Navbar from '@/components/Layout/Navbar';
import SearchComponent from '@/components/SearchComponent';

const searchPage: React.FC = () => {
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
        <SearchComponent />
      </main>
      <Footer />
    </motion.div>
  );
};

export default searchPage;
