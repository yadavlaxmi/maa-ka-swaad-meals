import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-deep-brown text-warm-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Maa Ka Swad" className="h-10 w-10" />
            <span className="font-display text-xl font-bold">Maa Ka Swad Tiffin Center</span>
          </div>
          <p className="font-body text-warm-cream/60 text-sm">
            © 2026 Maa Ka Swad Tiffin Center. Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
