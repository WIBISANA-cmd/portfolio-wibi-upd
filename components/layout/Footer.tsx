export function Footer() {
  return (
    <footer className="py-8 border-t border-white/10 mt-20 relative z-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} Dwi Agus Wibisana. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex gap-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
