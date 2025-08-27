import { ByCategorySection } from "../../products/ui/ByCategorySection";
import { FullServices } from "../../products/ui/FullServices";
import NewArrivalSection from "../../products/ui/NewArrivalSection";
import { PromoSlider } from "../../products/ui/PromoSlider";

export const HomePage = () => {
  return (
    <>
      <PromoSlider />
      <ByCategorySection />
      <NewArrivalSection />
      <FullServices/>
    </>
  );
};