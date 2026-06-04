export default function Footer() {
  return (
    <footer className="flex justify-between py-14 px-12 bg-dark-blue text-white text-center  mt-auto">
      <p className="text-sm tracking-tighter">
        &copy; {new Date().getFullYear()} TEXTURA APPARELS. All rights reserved.
      </p>

      <div className="flex  justify-center gap-6  text-lg text-red-200">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-white transition-colors "
        >
          Instagram
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-white transition-colors "
        >
          Twitter
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-white transition-colors "
        >
          Facebook
        </a>
      </div>
    </footer>
  );
}
