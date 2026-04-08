export function Footer() {
  return (
    <footer className="py-7 sm:py-8 border-t border-white/10 mt-14 sm:mt-16 md:mt-20 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 text-white/40 text-xs sm:text-sm text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} Dwi Agus Wibisana. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
