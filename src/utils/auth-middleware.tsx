import nextCookie from 'next-cookies';

function getToken(context: any) {
  const { token } = nextCookie(context);

  // validate token
  if (!token) {
    if (typeof window === `undefined`) {
      context.res.writeHead(302, { Location: `/login` });
      context.res.end();
    } else {
      context.res.writeHead(302, { Location: `/login` });
      context.res.end();
    }
  }
}

export default function withAuthServerSideProps(
  getServerSidePropsFunc?: Function,
) {
  return async (context: any) => {
    getToken(context);

    if (getServerSidePropsFunc) {
      return { props: { data: await getServerSidePropsFunc(context) } };
    }

    return { props: { data: null } };
  };
}
