import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Global, css } from '@emotion/react';

NProgress.configure({ showSpinner: false });

const ProgressBar = () => {
  const router = useRouter();

  useEffect(() => {
    const start = () => NProgress.start();
    const done = () => NProgress.done();

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);
    router.events.on('routeChangeError', done);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
      router.events.off('routeChangeError', done);
    };
  }, [router]);

  return (
    <>
      <Global
        styles={css`
          #nprogress .bar {
            background: #1e71be !important;
            height: 2px !important;
          }
          #nprogress .peg {
            box-shadow: 0 0 10px #738ebc, 0 0 5px #738ebc;
          }
        `}
      />
    </>
  );
};

export default ProgressBar;
