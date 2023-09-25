'use client';

import DetailsBanner from '@/components/Banner/DetailsBanner';
import EffectCardsSweeper from '@/components/EffectCards';
import Footer from '@/components/Layout/Footer';
import GlobalLoading from '@/components/Common/GlobalLoading';
import MovieReview from '@/components/MovieReview';
import Navbar from '@/components/Layout/Navbar';
import Row from '@/components/Layout/Row';
import Seasons from '@/components/Seasons';
import ToastContainerBar from '@/components/Common/ToastContainer';
import Trailer from '@/components/Trailer';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BASE_MOVIE_URL, API_KEY } from '@/utils/baseUrl';

const DetailsPage: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [movieDetails, setMovieDetails] = useState({
    movieVideo: [],
    movieCast: [],
    movieDetails: {},
    similar: [],
    images: [],
    review: []
  });
  const [loading, setLoading] = useState(true);
  const [isTV, setIsTv] = useState(false);

  const fetchData = async (replaceName: string) => {
    if (!replaceName) return;

    try {
      const isInclude = replaceName.includes('movie');
      const movieID = replaceName.replace('movie', '');

      if (!isInclude) {
        setIsTv(true);
      }

      setLoading(true);

      const [
        movieVideo,
        movieCast,
        movieDetails,
        similar,
        images,
        movieReview
      ] = await Promise.all([
        fetch(
          `${BASE_MOVIE_URL}/${
            isInclude ? 'movie' : 'tv'
          }/${movieID}/videos?api_key=${API_KEY}&language=en-US`
        ).then((res) => res.json()),

        fetch(
          `${BASE_MOVIE_URL}/${
            isInclude ? 'movie' : 'tv'
          }/${movieID}/credits?api_key=${API_KEY}&language=en-US`
        ).then((res) => res.json()),

        fetch(
          `${BASE_MOVIE_URL}/${
            isInclude ? 'movie' : 'tv'
          }/${movieID}?api_key=${API_KEY}&language=en-US`
        ).then((res) => res.json()),

        fetch(
          `${BASE_MOVIE_URL}/${
            isInclude ? 'movie' : 'tv'
          }/${movieID}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
        ).then((res) => res.json()),

        fetch(
          `${BASE_MOVIE_URL}/${
            isInclude ? 'movie' : 'tv'
          }/${movieID}/images?api_key=${API_KEY}`
        ).then((res) => res.json()),

        fetch(
          `${BASE_MOVIE_URL}/${
            isInclude ? 'movie' : 'tv'
          }/${movieID}/reviews?api_key=${API_KEY}&language=en-US&page=1`
        ).then((res) => res.json())
      ]);

      setMovieDetails((prev) => ({
        ...prev,
        movieVideo: movieVideo.results,
        movieCast: movieCast,
        movieDetails: movieDetails,
        similar: similar.results,
        images: images.backdrops,
        review: movieReview.results
      }));

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error: any) {
      console.log('🚀 ~ file: page.tsx:25 ~ fetchData ~ error:', error);
    }
  };

  useEffect(() => {
    if (!pathname) return;

    const replaceName = pathname.replace('/details/', '');
    fetchData(replaceName.toString());
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
      <main>
        <DetailsBanner
          movieDetails={movieDetails.movieDetails as IDetails}
          movieCast={movieDetails.movieCast as unknown as IMovieCastCrew}
          session={session}
        />
        <Trailer
          movieTrailer={movieDetails.movieVideo}
          movieDetails={movieDetails.movieDetails as IDetails}
        />
        <EffectCardsSweeper
          movieImage={movieDetails.images}
          movieDetails={movieDetails.movieDetails as IDetails}
        />
        {isTV && (
          <Seasons movieDetails={movieDetails.movieDetails as IDetails} />
        )}
        <MovieReview movieReview={movieDetails.review} />
        <Row
          movies={movieDetails.similar}
          title="YOU MAY ALSO LIKE"
          isMain={false}
        />
      </main>
      <Footer />
    </motion.div>
  );
};

export default DetailsPage;
