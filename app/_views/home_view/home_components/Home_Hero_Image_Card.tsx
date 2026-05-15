const Home_Hero_Image_Card = () => {
  return (
    <div className="absolute bottom-20 -left-20 bg-white p-2 rounded-xl asymmetric-shadow max-w-xs hidden md:block border border-secondary">
      <span className="font-label text-xs uppercase tracking-tighter text-primary block mb-2 font-bold">
        Featured Piece
      </span>
      <h4 className="font-headline font-bold text-xs leading-tight">
        The Executive Walnut Series
      </h4>
      <p className="text-xs font-body mt-2 text-on-surface-variant">
        Sustainably sourced in Sebenza.
      </p>
    </div>
  );
};

export default Home_Hero_Image_Card;
