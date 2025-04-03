import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">CryptoWeather Nexus</h1>
        <nav>
          <ul className="flex gap-4">
            <li><Link href="/" className="hover:text-gray-300">Home</Link></li>

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
