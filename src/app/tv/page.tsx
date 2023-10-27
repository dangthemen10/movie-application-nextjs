'use client';

import DividerMovieLine from '@/components/Slides/DividerMovieLine';
import Footer from '@/components/Layout/Footer';
import GlobalLoading from '@/components/Common/GlobalLoading';
import HomeBanner from '@/components/Banner/HomeBanner';
import Navbar from '@/components/Layout/Navbar';
import Row from '@/components/Layout/Row';
import ToastContainerBar from '@/components/Common/ToastContainer';
import tvSeriesRequest from '@/utils/tvSeasonRequest';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const TvSession: React.FC = () => {
  const [movie, setMovie] = useState({
    fetchNetflixOriginals: [],
    topRated: [],
    onTheAirTv: [],
    popularTv: [],
    trendingTv: [],
    airingToday: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const [
        fetchNetflixOriginals,
        topRated,
        onTheAirTv,
        popularTv,
        trendingTv,
        airingToday
      ] = await Promise.all([
        fetch(tvSeriesRequest.fetchNetflixOriginals).then((res) => res.json()),
        fetch(tvSeriesRequest.fetchTopRated).then((res) => res.json()),
        fetch(tvSeriesRequest.fetchOnTheAir).then((res) => res.json()),
        fetch(tvSeriesRequest.fetchPopular).then((res) => res.json()),
        fetch(tvSeriesRequest.fetchTvTrending).then((res) => res.json()),
        fetch(tvSeriesRequest.fetchAiringToday).then((res) => res.json())
      ]);

      setMovie((prev) => ({
        ...prev,
        fetchNetflixOriginals: fetchNetflixOriginals.results,
        topRated: topRated.results,
        onTheAirTv: onTheAirTv.results,
        popularTv: popularTv.results,
        trendingTv: trendingTv.results,
        airingToday: airingToday.results
      }));

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error: any) {
      console.log('🚀 ~ file: page.tsx:64 ~ fetchData ~ error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <ToastContainerBar />
      <Navbar />
      <GlobalLoading isLoading={isLoading} />
      {movie && (
        <main className="relative pl-4 pb-24 lg:space-y-24">
          <HomeBanner netflixOriginals={movie.fetchNetflixOriginals} />
          <section className="md:space-y-24 pt-20">
            <Row movies={movie.trendingTv} title="Trending Now" isMain={true} />
            <Row
              movies={movie.topRated}
              title="Top Rated TV Shows"
              isMain={true}
            />
            <div className="pb-14">
              <Row
                movies={movie.popularTv}
                title="Popular TV Shows"
                isMain={true}
              />
            </div>
            <DividerMovieLine
              netflixOriginals={movie.popularTv}
              horrorMovies={movie.topRated}
            />
            <Row
              movies={movie.airingToday}
              title="TV Shows Airing Today"
              isMain={true}
            />
            <Row
              movies={movie.onTheAirTv}
              title="Currently Airing TV Shows"
              isMain={true}
            />
          </section>
        </main>
      )}
      <Footer />
    </motion.div>
  );
};

export default TvSession;
