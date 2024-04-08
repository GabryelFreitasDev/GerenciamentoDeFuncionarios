import { AuthTokenError } from "@/services/errors/AuthTokenError";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";

//paginas que só podem ser acessadas por usuarios logados
export function canSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(context);

        const token = cookies['@nextauth.token'];

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

        try {
            return await fn(context);
        } catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(context, '@nextauth.token');

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }

        return await fn(context);
    }
}