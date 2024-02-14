'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import HomeBanner from '@/components/Banner/HomeBanner';
import GlobalLoading from '@/components/Common/GlobalLoading';
import ToastContainerBar from '@/components/Common/ToastContainer';
import Footer from '@/components/Layout/Footer';
import List from '@/components/Layout/List';
import Navbar from '@/components/Layout/Navbar';
import { API_KEY, BASE_MOVIE_URL } from '@/utils/baseUrl';
import { LIMIT_TOTAL_PAGE } from '@/utils/constants';
import { convertToKebabCase } from '@/utils/convertString';
import movieRequests from '@/utils/requests';

const TvSession: React.FC = () => {
  const pathname = usePathname();
  const [netflixOriginal, setNetflixOriginal] = useState([]);
  const [movies, setMovies] = useState<any>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPage: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const theme = createTheme({
    components: {
      MuiPagination: {
        styleOverrides: {
          ul: {
            li: {
              button: {
                color: '#fff'
              }
            }
          }
        }
      }
    }
  });

  const fetchNetflixOriginals = async () => {
    try {
      setIsLoading(true);

      const response: any = await fetch(
        movieRequests.fetchNetflixOriginals
      ).then((res) => res.json());

      setNetflixOriginal(response?.results);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error: any) {
      console.log(
        '🚀 ~ file: page.tsx:43 ~ fetchNetflixOriginals ~ error:',
        error
      );
    }
  };

  const fetchData = async (pathName: string) => {
    const DISCOVER_MOVIE_GENRES = ['28', '35', '27', '10749', '99'];
    try {
      setIsLoading(true);
      let data: { results: any; total_pages: number };
      if (DISCOVER_MOVIE_GENRES.includes(pathName)) {
        console.log('voday');
        data = await fetch(
          `${BASE_MOVIE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${pathName}&page=${pagination.currentPage}`
        ).then((res) => res.json());
      } else {
        data = await fetch(
          `${BASE_MOVIE_URL}/${pathName}?api_key=${API_KEY}&language=en-US&page=${pagination.currentPage}`
        ).then((res) => res.json());
      }

      setMovies(data?.results);
      setPagination((prev) => ({
        ...prev,
        totalPage:
          data.total_pages > LIMIT_TOTAL_PAGE
            ? LIMIT_TOTAL_PAGE
            : data.total_pages
      }));

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      console.log('🚀 ~ file: page.tsx:474 ~ fetchData ~ error:', error);
    }
  };

  useEffect(() => {
    fetchNetflixOriginals();
  }, []);

  useEffect(() => {
    if (!pathname) return;

    const pathMap: Record<string, string> = {
      'trending-now': 'trending/movie/day',
      'top-rated-movies': 'movie/top_rated',
      'popular-movies': 'movie/popular',
      'now-playing-movies': 'movie/now_playing',
      'action-thrillers': '28',
      comedies: '35',
      'scary-movies': '27',
      'romance-movies': '10749',
      documentaries: '99'
    };

    const replaceName = pathname.replace('/movies/', '');

    const path = pathMap[replaceName] || 'movie/upcoming';

    fetchData(path);
  }, [pathname, pagination.currentPage]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <ToastContainerBar />
      <Navbar />
      <GlobalLoading isLoading={isLoading} />
      {movies && (
        <main className="relative pl-4 lg:space-y-24">
          <HomeBanner netflixOriginals={netflixOriginal} />
          <section className="md:space-y-24 pt-20">
            <List
              movies={movies}
              title={convertToKebabCase(
                pathname?.replace('/movies/', '') || ''
              )}
            />
          </section>
        </main>
      )}
      <div className="pt-10 flex justify-center">
        <Stack spacing={2}>
          <ThemeProvider theme={theme}>
            <Pagination
              count={pagination.totalPage}
              page={pagination.currentPage}
              size="large"
              color="primary"
              onChange={handleChangePage}
            />
          </ThemeProvider>
        </Stack>
      </div>
      <Footer />
    </motion.div>
  );
};

export default TvSession;
