'use client';

import DividerMovieLine from '@/components/Slides/DividerMovieLine';
import Footer from '@/components/Layout/Footer';
import GlobalLoading from '@/components/Common/GlobalLoading';
import MovieBanner from '@/components/Banner/MovieBanner';
import Navbar from '@/components/Layout/Navbar';
import Row from '@/components/Layout/Row';
import ToastContainerBar from '@/components/Common/ToastContainer';
import requests from '@/utils/requests';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const [movie, setMovie] = useState({
    netflixOriginals: [],
    trendingNow: [],
    topRated: [],
    upcoming: [],
    popular: [],
    nowPlaying: [],
    actionMovies: [],
    comedyMovies: [],
    horrorMovies: [],
    romanceMovies: [],
    documentaries: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const [
        netflixOriginals,
        trendingNow,
        topRated,
        upcoming,
        popular,
        nowPlaying,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries
      ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrendingMovie).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchUpcoming).then((res) => res.json()),
        fetch(requests.fetchPopular).then((res) => res.json()),
        fetch(requests.fetchNowPlaying).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json())
      ]);

      setMovie((prev) => ({
        ...prev,
        netflixOriginals: netflixOriginals.results,
        trendingNow: trendingNow.results,
        topRated: topRated.results,
        upcoming: upcoming.results,
        popular: popular.results,
        nowPlaying: nowPlaying.results,
        actionMovies: actionMovies.results,
        comedyMovies: comedyMovies.results,
        horrorMovies: horrorMovies.results,
        romanceMovies: romanceMovies.results,
        documentaries: documentaries.results
      }));

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error: any) {
      console.log('🚀 ~ file: page.tsx:28 ~ fetchData ~ error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log('fetchNetflixOriginals', movie.netflixOriginals);

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
          <MovieBanner netflixOriginals={movie.netflixOriginals} />
          <section className="md:space-y-24 pt-20">
            <Row
              movies={movie.trendingNow}
              title="Trending Now"
              isMain={true}
            />
            <Row movies={movie.popular} title="Popular Movies" isMain={true} />
            <Row
              movies={movie.upcoming}
              title="Upcoming Movies"
              isMain={true}
            />
            <Row
              movies={movie.nowPlaying}
              title="Now Playing Movies"
              isMain={true}
            />
            <div className="pb-14">
              <Row
                movies={movie.topRated}
                title="Top Rated Movies"
                isMain={true}
              />
            </div>
            <DividerMovieLine
              netflixOriginals={movie.netflixOriginals}
              horrorMovies={movie.horrorMovies}
            />
            <Row
              movies={movie.actionMovies}
              title="Action Thrillers"
              isMain={true}
            />
            <Row movies={movie.comedyMovies} title="Comedies" isMain={true} />
            <Row
              movies={movie.horrorMovies}
              title="Scary Movies"
              isMain={true}
            />
            <Row
              movies={movie.romanceMovies}
              title="Romance Movies"
              isMain={true}
            />
            <Row
              movies={movie.documentaries}
              title="Documentaries"
              isMain={true}
            />
          </section>
        </main>
      )}
      <Footer />
    </motion.div>
  );
}
