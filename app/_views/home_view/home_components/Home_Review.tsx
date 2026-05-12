import App_Double_Text from "@/components/shared/App_Double_Text";
import { Quote } from "lucide-react";

const Home_Review = () => {
  return (
    <section className="my-20 containerclass grid gap-8">
      <App_Double_Text
        header={{
          children: "What Our Clients Say",
          variant: "heading",
          className: "tracking-tighter",
        }}
        para={{
          children: "Trusted across South Africa and SADC",
          className: "italic max-w-md",
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {[1, 2, 3].map((_, index) => (
          <div
            className="space-y-6 bg-white p-6 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_rgba(0,0,0,0.12)] transition-all duration-300"
            key={index}
          >
            <Quote size={20} className="text-primary" />
            <p className="font-body text-xl italic text-on-surface leading-relaxed">
              "The durability of Litace furniture in our regional schools has
              been unparalleled. Truly built for the African landscape."
            </p>
            <App_Double_Text
              className="gap-y-1"
              header={{
                children: "Director of Education",
                variant: "cardText",
                className:
                  "font-bold text-sm uppercase tracking-widest text-primary",
              }}
              para={{
                children: "SADC Regional Council",
                className: "text-xs uppercase opacity-60",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home_Review;
