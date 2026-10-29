import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto grid max-w-3xl gap-6 px-6 py-32 text-center">
      <h1 className="font-display text-6xl uppercase">
        Página <span className="text-accent">não encontrada</span>
      </h1>
      <p className="text-body">O endereço pode ter mudado ou a página não está mais publicada.</p>
      <Link href="/" className="font-bold text-accent uppercase hover:underline">
        Voltar para o início
      </Link>
    </main>
  );
}
