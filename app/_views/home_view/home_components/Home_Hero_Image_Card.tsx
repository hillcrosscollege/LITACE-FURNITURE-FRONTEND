const Home_Hero_Image_Card = () => {
  return (
    <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl asymmetric-shadow max-w-xs hidden md:block border border-purple-50">
      <span className="font-label text-xs uppercase tracking-tighter text-primary block mb-2 font-bold">
        Featured Piece
      </span>
      <h4 className="font-headline font-bold text-lg leading-tight">
        The Executive Walnut Series
      </h4>
      <p className="text-sm font-body mt-2 text-on-surface-variant">
        Sustainably sourced, hand-finished in Sebenza.
      </p>
    </div>
  );
};

export default Home_Hero_Image_Card;
