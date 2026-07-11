function AppFooter() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-gray-500 sm:flex-row sm:px-6 lg:px-8">
        <p>© 2026 N9AWA</p>
        <div className="flex items-center gap-4">
          <a href="#" className="transition-colors hover:text-[#2678D1]">
            Support
          </a>
          <a href="#" className="transition-colors hover:text-[#2678D1]">
            Confidentialité
          </a>
          <a href="#" className="transition-colors hover:text-[#2678D1]">
            Conditions
          </a>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter
