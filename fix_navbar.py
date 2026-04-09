with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

content = content.replace('''<<<<<<< fix/high-precision-audit-6312751123224075108
              <button className="text-[11px] font-extrabold text-white/30 hover:text-white transition-all duration-300 uppercase tracking-[0.2em] font-manrope h-12 px-6">
                Inquiry
              </button>

              <button className="relative h-12 px-16 flex items-center justify-center text-[10px] font-bold text-white border border-white/20 bg-black/40 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md rounded-full hover:bg-black/60 hover:text-white hover:border-white/40 transition-all duration-200 uppercase tracking-[0.2em] font-manrope overflow-hidden group/cta">
=======
              <button className="relative h-12 px-16 flex items-center justify-center text-[10px] font-bold text-white border border-white/20 bg-white/5 backdrop-blur-md rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-200 uppercase tracking-[0.2em] font-manrope overflow-hidden group/cta">
>>>>>>> main''', '''              <button className="text-[11px] font-extrabold text-white/30 hover:text-white transition-all duration-300 uppercase tracking-[0.2em] font-manrope h-12 px-6">
                Inquiry
              </button>

              <button className="relative h-12 px-16 flex items-center justify-center text-[10px] font-bold text-white border border-white/20 bg-black/40 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-md rounded-full hover:bg-black/60 hover:text-white hover:border-white/40 transition-all duration-200 uppercase tracking-[0.2em] font-manrope overflow-hidden group/cta">''')

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)
