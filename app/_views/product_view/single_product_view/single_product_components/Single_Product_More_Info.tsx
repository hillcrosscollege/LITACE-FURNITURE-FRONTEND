import App_Header_Text from "@/components/app_ui/App_Header_Text";
import App_Paragraph from "@/components/app_ui/App_Paragraph";

const Single_Product_More_Info = () => {
  return (
    <div className="grid gap-4">
      <App_Header_Text text="More Info" type="cardhead" />
      <App_Paragraph
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit tenetur minus pariatur numquam quia iure explicabo minima odit? Voluptatem quod sit, deserunt delectus asperiores voluptas suscipit est. Suscipit dicta placeat ad quasi reiciendis, quae eius natus consectetur, in vel modi quis iusto. Repellendus quas tempora consequuntur enim earum, dolore numquam?"
        style="text-base max-w-[90%]"
      />
      <App_Paragraph
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit tenetur minus pariatur numquam quia iure explicabo minima odit? Voluptatem quod sit, deserunt delectus asperiores voluptas suscipit est. Suscipit dicta placeat ad quasi reiciendis, quae eius natus consectetur, in vel modi quis iusto. Repellendus quas tempora consequuntur enim earum, dolore numquam?"
        style="text-base max-w-[90%]"
      />
    </div>
  );
};

export default Single_Product_More_Info;
