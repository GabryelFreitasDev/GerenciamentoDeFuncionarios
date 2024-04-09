import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

//paginas que só podem ser acessadas por visitantes
export function canSSRGuest<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(context);
    const token = cookies['@nextauth.token'];

    // Se o cara tentar acessar a pagina porem tendo já um login salvo redirecionamos
    if (token && token !== 'undefined') {
      return {
        redirect: {
          destination: '/menu',
          permanent: false,
        }
      }
    }

    return await fn(context);
  }
}