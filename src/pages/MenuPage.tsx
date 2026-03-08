import Navbar from "@/components/Navbar";
import MenuSection from "@/components/MenuSection";

const MenuPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <MenuSection />
      </div>
    </div>
  );
};

export default MenuPage;
