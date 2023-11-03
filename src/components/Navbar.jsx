function Navbar() {
  return (
    <header className="flex justify-center items-center gap-4 py-3 bg-[#2e4274]">
      <img
        className="w-32"
        src="./src/assets/imgs/logo-espaco-mulher.png"
        alt=""
      />
      <h1 className="text-5xl font-bold text-[#e5c3a7] font-display">
        Espaço Mulher
      </h1>
    </header>
  );
}

export { Navbar };
