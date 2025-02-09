import Image from 'next/image';
import Error404 from '@/assets/404Error.svg'
import s from '@/styles/error404.module.scss'

export default function NotFound() {
  return (
    <section className={s.container}>
      <h1>Página não encontrada</h1>
      <Image
        src={Error404}
        alt="404 Error"
        className={s.image}
      />
    </section>
  );
}