'use client';

import Footer from '@/components/Layout/Footer';
import GlobalLoading from '@/components/Common/GlobalLoading';
import HomeBanner from '@/components/Banner/HomeBanner';
import Navbar from '@/components/Layout/Navbar';
import ToastContainerBar from '@/components/Common/ToastContainer';
import tvSeriesRequest from '@/utils/tvSeasonRequest';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { API_KEY, BASE_MOVIE_URL } from '@/utils/baseUrl';
import List from '@/components/Layout/List';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LIMIT_TOTAL_PAGE } from '@/utils/constants';
import { convertToKebabCase } from '@/utils/convertString';

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
        tvSeriesRequest.fetchNetflixOriginals
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
    try {
      setIsLoading(true);
      const data = await fetch(
        `${BASE_MOVIE_URL}/${pathName}?api_key=${API_KEY}&language=en-US&page=${pagination.currentPage}`
      ).then((res) => res.json());

      setMovies((prev: any) => {
        return [...prev, ...data?.results];
      });

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
      'trending-now': 'trending/tv/day',
      'top-rated-tv-shows': 'tv/top_rated',
      'popular-tv-shows': 'tv/popular',
      'tv-shows-airing-today': 'tv/airing_today'
    };

    const replaceName = pathname.replace('/tv/', '');
    const path = pathMap[replaceName] || 'tv/on_the_air';

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
              title={convertToKebabCase(pathname?.replace('/tv/', '') || '')}
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
